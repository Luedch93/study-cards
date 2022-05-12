import { Injectable } from '@angular/core';
import { Card } from '../types/Card';

@Injectable({
  providedIn: 'root'
})
export class DeckManagementService {

  constructor() { }

  nextCard(cards: Card[], cardId: number): Card | undefined {
    const index = cards.findIndex((card) => card.id == cardId);
    return index == -1 ? undefined : cards[index + 1];
  }

  previousCard(cards: Card[], cardId: number): Card | undefined {
    const index = cards.findIndex((card) => card.id == cardId);
    return index == -1 ? undefined : cards[index - 1];
  }

  hasNextCard(cards: Card[], cardId: number): boolean {
    const card = this.nextCard(cards, cardId);
    return card !== undefined;
  }
  hasPreviousCard(cards: Card[], cardId: number): boolean {
    const card = this.previousCard(cards, cardId);
    return card !== undefined;
  }
}
