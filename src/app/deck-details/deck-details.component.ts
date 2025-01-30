import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { combineLatestWith, filter } from 'rxjs';

import { DeckService } from '../data/deck.service';
import { RegexService } from '../helpers/regex.service';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';
import { UpperCasePipe } from '@angular/common';
import { CardNavigationComponent } from '../card-navigation/card-navigation.component';

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
  ],
})
export class DeckDetailsComponent implements OnInit {
  deckId?: number;
  cards: Card[] = [];
  deck?: Deck;
  cardId?: number;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);
  private readonly regexService = inject(RegexService);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.getCardIdFromRoute();
        this.defaultNavigation();
      });
    this.getDeckIdFromRoute();
    this.getCardIdFromRoute();
    this.fetchInfo();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.deckService.clearCards();
    this.deckService.clearDeck();
  }

  fetchInfo() {
    if (this.deckId) {
      this.deckService
        .getCardsByDeckId(this.deckId)
        .pipe(
          combineLatestWith(this.deckService.getDeckById(this.deckId)),
          takeUntilDestroyed()
        )
        .subscribe(([cards, deck]) => {
          this.deck = deck;
          this.cards = cards;
          this.defaultNavigation();
        });
    }
  }

  getDeckIdFromRoute() {
    this.deckId = Number(this.activatedRoute.snapshot.paramMap.get('deckID'));
  }

  getCardIdFromRoute() {
    if (this.activatedRoute.children[0])
      this.cardId = Number(
        this.activatedRoute.children[0].snapshot.paramMap.get('cardID')
      );
  }

  navigateToFirstCard() {
    if (this.cards.length)
      this.router.navigate(['card', this.cards[0].id], {
        relativeTo: this.activatedRoute,
      });
  }

  navigateToCard(card: Card): void {
    if (card)
      this.router.navigate(['card', card.id], {
        relativeTo: this.activatedRoute,
      });
  }

  navigateToNoCards() {
    this.router.navigate(['no-cards'], { relativeTo: this.activatedRoute });
  }

  editCardURL(): string[] {
    return ['card', String(this.cardId), 'edit'];
  }

  cardsURL(): string[] {
    return ['/deck', String(this.deckId)];
  }

  showCardEdit(): boolean {
    return (
      this.cards.length > 0 &&
      this.regexService.isDeckAndCardURL(this.router.url)
    );
  }

  defaultNavigation() {
    if (this.regexService.isOnlyDeckURL(this.router.url)) {
      if (this.cards.length > 0) {
        this.navigateToFirstCard();
      } else {
        this.navigateToNoCards();
      }
    }
  }
}
