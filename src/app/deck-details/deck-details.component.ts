import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith } from 'rxjs';

import { DeckService } from '../data/deck.service';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss']
})
export class DeckDetailsComponent implements OnInit {

  deckId?: number;
  cards: Card[] = [];
  deck?: Deck;
  cardId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deckService: DeckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDeckIdFromRoute();
    this.getCardIdFromRoute();

    this.fetchInfo().then(() => {
      if (this.activatedRoute.children.length == 0)
        this.navigateToFirstCard();
    });
    this.router.events.subscribe(() => {
      this.getCardIdFromRoute();
    })
  }

  fetchInfo() {
    return new Promise((res, rej) => {
      if (this.deckId) {
        this.deckService.getDeckById(this.deckId)
          .pipe(
            combineLatestWith(this.deckService.getCardsByDeckId(this.deckId))
          )
          .subscribe(([deck, cards]) => {
            this.deck = deck;
            this.cards = cards;
            res(true);
          })
      } else {
        rej('Deck Id not provided')
      }
    })
  }

  getDeckIdFromRoute() {
    this.deckId = Number(this.activatedRoute.snapshot.paramMap.get('deckID'));
  }

  getCardIdFromRoute() {
    if (this.activatedRoute.children[0])
      this.cardId = Number(this.activatedRoute.children[0].snapshot.paramMap.get('cardID'));
  }

  navigateToFirstCard() {
    if (this.cards.length)
      this.router.navigate(['card', this.cards[0].id], {relativeTo: this.activatedRoute})
  }

  hasNextCard(): boolean {
    const card = this.nextCard();
    return card !== undefined;
  }
  hasPreviousCard(): boolean {
    const card = this.previousCard()
    return card !== undefined;
  }

  navigateCard(cardId: number): void {
    this.router.navigate(['card', cardId], {relativeTo: this.activatedRoute})
  }

  private nextCard(): Card | undefined {
    const index = this.cards.findIndex(card => card.id == this.cardId);
    return index == -1 ? undefined : this.cards[index + 1];
  }

  private previousCard(): Card | undefined {
    const index = this.cards.findIndex(card => card.id == this.cardId);
    return index == -1 ? undefined : this.cards[index - 1];
  }
}
