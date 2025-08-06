import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import { combineLatestWith } from 'rxjs';

import { DeckService } from '../data/deck.service';
import { RegexService } from '../helpers/regex.service';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';
import { CardNavigationComponent } from '../card-navigation/card-navigation.component';
import { HideInEditPath } from '../helpers/hide-in-edit-path.directive';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    UpperCasePipe,
    CardNavigationComponent,
    HideInEditPath,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckDetailsComponent implements OnInit {
  deckId: WritableSignal<number | undefined> = signal(undefined);
  cards: WritableSignal<Card[]> = signal([]);
  deck: WritableSignal<Deck | undefined> = signal(undefined);
  cardId: WritableSignal<number | undefined> = signal(undefined);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);
  private readonly regexService = inject(RegexService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getDeckIdFromRoute();
    this.getCardIdFromRoute();
    this.fetchInfo();
  }

  ngOnDestroy(): void {
    this.deckService.clearCards();
    this.deckService.clearDeck();
  }

  fetchInfo() {
    if (this.deckId) {
      this.deckService
        .getCardsByDeckId(this.deckId() as number)
        .pipe(
          combineLatestWith(
            this.deckService.getDeckById(this.deckId() as number)
          )
        )
        .subscribe(([cards, deck]) => {
          this.deck.set(deck);
          this.cards.set(cards);
          this.defaultNavigation();
        });
    }
  }

  getDeckIdFromRoute() {
    this.deckId.set(
      Number(this.activatedRoute.snapshot.paramMap.get('deckID'))
    );
  }

  getCardIdFromRoute() {
    setTimeout(() => {
      if (this.activatedRoute.children[0])
        this.cardId.set(
          Number(
            this.activatedRoute.children[0].snapshot.paramMap.get('cardID')
          )
        );
    });
  }

  navigateToFirstCard() {
    if (this.cards().length)
      this.router.navigate(['card', this.cards()[0].id], {
        relativeTo: this.activatedRoute,
      });
  }

  navigateToCard(card: Card): void {
    if (card)
      this.router.navigate(['card', card.id], {
        relativeTo: this.activatedRoute,
      });
    this.cardId.set(card?.id);
  }

  navigateToNoCards() {
    this.router.navigate(['no-cards'], { relativeTo: this.activatedRoute });
  }

  editCardURL(): string[] {
    return ['card', String(this.cardId()), 'edit'];
  }

  cardsURL(): string[] {
    return [
      '/deck',
      String(this.deckId()),
      'card',
      this.cards()[0].id.toString(),
    ];
  }

  showCardEdit(): boolean {
    return (
      this.cards().length > 0 &&
      this.regexService.isDeckAndCardURL(this.router.url)
    );
  }

  defaultNavigation() {
    if (this.regexService.isOnlyDeckURL(this.router.url)) {
      if (this.cards().length > 0) {
        this.navigateToFirstCard();
      } else {
        this.navigateToNoCards();
      }
    }
  }
}
