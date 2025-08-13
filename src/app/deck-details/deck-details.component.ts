import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
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

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CardNavigationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckDetailsComponent implements OnInit {
  deckId: WritableSignal<number> = signal(0);
  cards: WritableSignal<Card[]> = signal([]);
  deck: WritableSignal<Deck> = signal({ id: 0, name: '' });
  cardId: WritableSignal<number> = signal(0);
  loading: WritableSignal<boolean> = signal(true);

  cardsLength: Signal<number> = computed(() => this.cards().length);
  deckTitle: Signal<string> = computed(() => this.deck().name.toUpperCase());

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
            this.deckService.getDeckById(this.deckId() as number),
          ),
        )
        .subscribe(([cards, deck]) => {
          if (!deck) {
            this.router.navigate(['decks']);
            return;
          }

          this.deck.set(deck as Deck);
          this.cards.set(cards);
          this.defaultNavigation();
          this.loading.set(false);
        });
    }
  }

  getDeckIdFromRoute() {
    this.deckId.set(
      Number(this.activatedRoute.snapshot.paramMap.get('deckID')),
    );
  }

  getCardIdFromRoute() {
    setTimeout(() => {
      if (this.activatedRoute.children[0])
        this.cardId.set(
          Number(
            this.activatedRoute.children[0].snapshot.paramMap.get('cardID'),
          ),
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
