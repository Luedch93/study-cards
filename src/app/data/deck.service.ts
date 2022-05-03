import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';
import { CARDS, DECKS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor() {}

  getDecks(): Observable<Deck[]> {
    return of(DECKS);
  }

  getDeckById(deckId: number): Observable<Deck | undefined> {
    const deck = DECKS.find(deck => deck.id == deckId);
    return of(deck);
  }

  getCardsByDeckId(deckId: number): Observable<Card[]> {
    const cards = CARDS.filter(card => card.deckId == deckId);
    return of(cards)
  }

  getCardById(cardId: number): Observable<Card | undefined> {
    const card = CARDS.find(card => card.id == cardId);
    return of(card)
  }
}
