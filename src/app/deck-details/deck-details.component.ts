import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatestWith, filter, Subject, takeUntil } from 'rxjs';

import { DeckService } from '../data/deck.service';
import { RegexService } from '../helpers/regex.service';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss'],
})
export class DeckDetailsComponent implements OnInit, OnDestroy {
  deckId?: number;
  cards: Card[] = [];
  deck?: Deck;
  cardId?: number;
  private notifier = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private deckService: DeckService,
    private regexService: RegexService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDeckIdFromRoute();
    this.getCardIdFromRoute();

    this.fetchInfo();

    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.notifier)
      ).subscribe(() => {
        this.getCardIdFromRoute();
        this.defaultNavigation();
    });
  }

  ngOnDestroy(): void {
    this.deckService.clearCards();
    this.deckService.clearDeck();
    this.notifier.next(true);
    this.notifier.complete();
  }

  fetchInfo() {
    if (this.deckId) {
      this.deckService.getCardsByDeckId(this.deckId)
        .pipe(
          combineLatestWith(this.deckService.getDeckById(this.deckId)),
          takeUntil(this.notifier),
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
    if (card) this.router.navigate(['card', card.id], { relativeTo: this.activatedRoute });
  }

  navigateToNoCards() {
    this.router.navigate(['no-cards'], { relativeTo: this.activatedRoute })
  }

  defaultNavigation() {
    if (this.regexService.isOnlyDeckURL(this.router.url)) {
      if (this.cards.length > 0) {
        this.navigateToFirstCard()
      } else {
        this.navigateToNoCards()
      }
    }
  }
}
