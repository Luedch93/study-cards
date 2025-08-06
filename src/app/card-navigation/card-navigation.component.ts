import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { DeckManagementService } from '../helpers/deck-management.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNavigationComponent implements OnChanges {
  @Input() cards: Card[] = [];
  @Input() cardId?: number;
  @Output() onNavigateNext = new EventEmitter<Card>();
  @Output() onNavigatePrevious = new EventEmitter<Card>();

  hasPreviousCard = false;
  hasNextCard = false;

  private readonly deckManagementService = inject(DeckManagementService);

  ngOnChanges(changes: SimpleChanges): void {
    const { cards, cardId } = changes;

    if (cards || cardId) {
      this.checkPreviousNextCards();
    }
  }

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

  private checkPreviousNextCards() {
    if (this.cards && this.cardId) {
      this.hasNextCard = this.deckManagementService.hasNextCard(
        this.cards,
        this.cardId
      );
      this.hasPreviousCard = this.deckManagementService.hasPreviousCard(
        this.cards,
        this.cardId
      );
    }
  }
}
