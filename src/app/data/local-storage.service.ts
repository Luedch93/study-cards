import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getDecks(): string | null {
    return localStorage.getItem('app_decks');
  }

  setDecks(decks: string): void {
    localStorage.setItem('app_decks', decks);
  }

  getCards(): string | null {
    return localStorage.getItem('app_cards');
  }

  setCards(cards: string): void {
    localStorage.setItem('app_cards', cards);
  }
}
