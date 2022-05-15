import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckManagementService } from '../helpers/deck-management.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-card-navigation',
  templateUrl: './card-navigation.component.html',
  styleUrls: ['./card-navigation.component.scss']
})
export class CardNavigationComponent implements OnInit {

  @Input() cards: Card[] = [];
  @Input() cardId?: number;
  @Output() onNavigateNext = new EventEmitter<Card>();
  @Output() onNavigatePrevious = new EventEmitter<Card>();

  constructor(
    public deckManagementService: DeckManagementService
  ) { }

  ngOnInit(): void {}

  navigateNextCard(): void {
    if (this.cardId) {
      const card = this.deckManagementService.nextCard(this.cards, this.cardId);
      this.onNavigateNext.emit(card);
    }
  }

  navigatePreviousCard(): void {
    if (this.cardId) {
      const card = this.deckManagementService.previousCard(this.cards, this.cardId);
      this.onNavigatePrevious.emit(card);
    }
  }
}
