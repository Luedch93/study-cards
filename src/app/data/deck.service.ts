import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, CardForm } from '../types/Card';
import { Deck, DeckForm } from '../types/Deck';
import { MessagesService } from './messages.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decks$: BehaviorSubject<Deck[]> = new BehaviorSubject<Deck[]>([]);
  private deck$: BehaviorSubject<Deck | undefined> = new BehaviorSubject<
    Deck | undefined
  >(undefined);
  private cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  private card$: BehaviorSubject<Card | undefined> = new BehaviorSubject<
    Card | undefined
  >(undefined);

  constructor(
    private messageService: MessagesService,
    private storageService: StorageService
  ) {}

  getDecks(): BehaviorSubject<Deck[]> {
    const decks = this.storageService.getDecks();
    this.messageService.addMessage('Deck Service: getDecks called');
    this.decks$.next(decks);
    return this.decks$;
  }

  getDeckById(deckId: number): BehaviorSubject<Deck | undefined> {
    const decks = this.storageService.getDecks();
    const deck = decks.find((deck) => deck.id == deckId);
    this.messageService.addMessage(
      'Deck Service: getDeckById called with deckId: ' + deckId
    );
    this.deck$.next(deck);
    return this.deck$;
  }

  getCardsByDeckId(deckId: number): BehaviorSubject<Card[]> {
    const storageCards = this.storageService.getCards();
    const cards = storageCards.filter((card) => card.deckId == deckId);
    this.messageService.addMessage(
      'Deck Service: getCardsByDeckId called with deckId: ' + deckId
    );
    this.cards$.next(cards);
    return this.cards$;
  }

  getCardById(cardId: number): BehaviorSubject<Card | undefined> {
    const storageCards = this.storageService.getCards();
    const card = storageCards.find((card) => card.id == cardId);
    this.messageService.addMessage(
      'Deck Service: getCardById called with cardId: ' + cardId
    );
    this.card$.next(card);
    return this.card$;
  }

  addCardToDeck(deckId: number, card: CardForm): void {
    const storageCards = this.storageService.getCards();
    storageCards.push({
      deckId,
      answer: card.answer,
      id: new Date().getTime(),
      question: card.question,
    });
    const cards = storageCards.filter((card) => card.deckId == deckId);
    this.storageService.setCards(storageCards);
    this.cards$.next(cards);
  }

  addDeck(deck: DeckForm) {
    const decks = this.storageService.getDecks();
    decks.push({
      id: new Date().getTime(),
      name: deck.name,
    });
    this.storageService.setDecks(decks);
    this.decks$.next(decks);
  }

  editDeck(deckID: number, deckForm: DeckForm): void {
    const decks = this.storageService.getDecks();

    const deck = decks.find((d) => d.id === deckID);
    if (deck) {
      deck.name = deckForm.name;
    }

    this.storageService.setDecks(decks);
    this.decks$.next(decks);
    this.deck$.next(deck);
  }

  editCard(cardId: number, cardForm: CardForm): void {
    const storageCards = this.storageService.getCards();
    let cards: Card[] = [];
    const card = storageCards.find((c) => c.id === cardId);

    if (card) {
      card.answer = cardForm.answer;
      card.question = cardForm.question;
      cards = storageCards.filter((c) => c.deckId === card.deckId);
      this.storageService.setCards(storageCards);
    }
    this.cards$.next(cards);
  }

  clearDeck() {
    this.deck$.next(undefined);
  }

  clearCards() {
    this.cards$.next([]);
  }
}
