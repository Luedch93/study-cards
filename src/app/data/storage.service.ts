import { Injectable } from '@angular/core';
import { Card } from '../types/Card';
import { Deck } from '../types/Deck';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private localStorageService: LocalStorageService) {}

  getCards(): Card[] {
    const cards = this.localStorageService.getCards();
    return cards !== null ? JSON.parse(cards) : [];
  }

  setCards(cards: Card[]): void {
    this.localStorageService.setCards(JSON.stringify(cards));
  }

  getDecks(): Deck[] {
    const decks = this.localStorageService.getDecks();
    return decks !== null ? JSON.parse(decks) : [];
  }

  setDecks(decks: Deck[]): void {
    this.localStorageService.setDecks(JSON.stringify(decks));
  }
}
