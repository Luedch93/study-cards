import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  output,
  signal,
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
  cards = input.required<Card[]>();
  cardId = input.required<number>();
  onNavigateNext = output<Card>();
  onNavigatePrevious = output<Card>();

  hasPreviousCard = signal(false);
  hasNextCard = signal(false);

  private readonly deckManagementService = inject(DeckManagementService);

  ngOnChanges(changes: SimpleChanges): void {
    const { cards, cardId } = changes;

    if (cards || cardId) {
      this.checkPreviousNextCards();
    }
  }

  navigateNextCard(): void {
    if (!this.cardId()) return;

    const card = this.deckManagementService.nextCard(
      this.cards(),
      this.cardId(),
    );
    if (card) {
      this.onNavigateNext.emit(card);
    }
  }

  navigatePreviousCard(): void {
    if (!this.cardId()) return;

    const card = this.deckManagementService.previousCard(
      this.cards(),
      this.cardId(),
    );

    if (card) {
      this.onNavigatePrevious.emit(card);
    }
  }

  private checkPreviousNextCards() {
    if (this.cards() && this.cardId()) {
      this.hasNextCard.set(
        this.deckManagementService.hasNextCard(this.cards(), this.cardId()),
      );
      this.hasPreviousCard.set(
        this.deckManagementService.hasPreviousCard(this.cards(), this.cardId()),
      );
    }
  }
}
