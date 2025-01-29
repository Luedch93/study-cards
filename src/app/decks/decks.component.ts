import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DeckService } from '../data/deck.service';
import { Deck } from '../types/Deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  imports: [RouterLink],
})
export class DecksComponent {
  decks: Deck[] = [];

  private readonly deckService = inject(DeckService);

  constructor() {
    this.getDecks();
  }

  getDecks(): void {
    this.deckService
      .getDecks()
      .pipe(takeUntilDestroyed())
      .subscribe((decks) => (this.decks = decks));
  }
}
