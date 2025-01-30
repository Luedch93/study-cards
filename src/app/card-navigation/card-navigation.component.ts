import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { DeckManagementService } from '../helpers/deck-management.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.scss'],
})
export class CardNavigationComponent {
  @Input() cards: Card[] = [];
  @Input() cardId?: number;
  @Output() onNavigateNext = new EventEmitter<Card>();
  @Output() onNavigatePrevious = new EventEmitter<Card>();

  public readonly deckManagementService = inject(DeckManagementService);

  navigateNextCard(): void {
    if (this.cardId) {
      const card = this.deckManagementService.nextCard(this.cards, this.cardId);
      this.onNavigateNext.emit(card);
    }
  }

  navigatePreviousCard(): void {
    if (this.cardId) {
      const card = this.deckManagementService.previousCard(
        this.cards,
        this.cardId
      );
      this.onNavigatePrevious.emit(card);
    }
  }
}
