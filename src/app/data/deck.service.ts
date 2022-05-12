import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';
import { CARDS, DECKS } from './constants';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decks$: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);
  private deck$: BehaviorSubject<Deck | undefined> = new BehaviorSubject<Deck | undefined>(undefined);
  private cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  private card$: BehaviorSubject<Card | undefined> = new BehaviorSubject<Card | undefined>(undefined);

  constructor(private messageService: MessagesService) {}

  getDecks(): BehaviorSubject<Deck[]> {
    this.messageService.addMessage('Deck Service: getDecks called');
    this.decks$.next(DECKS);
    return this.decks$;
  }

  getDeckById(deckId: number): BehaviorSubject<Deck | undefined> {
    const deck = DECKS.find(deck => deck.id == deckId);
    this.messageService.addMessage('Deck Service: getDeckById called with deckId: ' + deckId);
    this.deck$.next(deck);
    return this.deck$;
  }

  getCardsByDeckId(deckId: number): BehaviorSubject<Card[]> {
    const cards = CARDS.filter(card => card.deckId == deckId);
    this.messageService.addMessage('Deck Service: getCardsByDeckId called with deckId: ' + deckId);
    this.cards$.next(cards);
    return this.cards$;
  }

  getCardById(cardId: number): BehaviorSubject<Card | undefined> {
    const card = CARDS.find(card => card.id == cardId);
    this.messageService.addMessage('Deck Service: getCardById called with cardId: ' + cardId);
    this.card$.next(card);
    return this.card$;
  }

  addCardToDeck(deckId: number, card: {answer: string, question: string}): void {
    CARDS.push({
      deckId,
      answer: card.answer,
      id: Math.round(Math.random() * 10000),
      question: card.question,
    });
    const cards = CARDS.filter(card => card.deckId == deckId);
    this.cards$.next(cards);
  }

  clearDeck() {
    this.deck$.next(undefined);
  }

  clearCards() {
    this.cards$.next([]);
  }
}
