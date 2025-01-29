import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DeckFormService } from '../data/deck-form.service';
import { DeckService } from '../data/deck.service';
import { DeckForm } from '../types/Deck';
import { DeckFormComponent } from '../deck-form/deck-form.component';

@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss'],
  imports: [DeckFormComponent],
})
export class NewDeckComponent {
  deckForm: DeckForm = { name: '' };
  private readonly deckFormService = inject(DeckFormService);
  private readonly deckService = inject(DeckService);
  private readonly router = inject(Router);

  constructor() {
    this.listenFormAndSubmitDeck();
  }

  navigateToDeckList() {
    this.router.navigate(['decks']);
  }

  private listenFormAndSubmitDeck(): void {
    this.deckFormService
      .getDeckForm()
      .pipe(takeUntilDestroyed())
      .subscribe((deckForm) => {
        this.deckService.addDeck(deckForm);
        this.navigateToDeckList();
      });
  }
}
