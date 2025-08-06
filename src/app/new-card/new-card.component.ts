import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CardFormService } from '../data/card-form.service';
import { DeckService } from '../data/deck.service';
import { CardForm } from '../types/Card';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  imports: [CardFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCardComponent {
  cardForm: CardForm = { answer: '', question: '' };
  private readonly cardFormService = inject(CardFormService);
  private readonly deckService = inject(DeckService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.listenFormAndSubmitCard();
  }

  getDeckIDFormRoute(): number {
    return this.activatedRoute.parent
      ? Number(this.activatedRoute.parent.snapshot.paramMap.get('deckID'))
      : 0;
  }

  listenFormAndSubmitCard(): void {
    const deckId = this.getDeckIDFormRoute();
    if (deckId !== 0) {
      this.cardFormService
        .getCardForm()
        .pipe(takeUntilDestroyed())
        .subscribe((cardForm) => {
          const cardId = this.deckService.addCardToDeck(deckId, cardForm);
          this.router.navigate([
            'deck',
            this.getDeckIDFormRoute(),
            'card',
            cardId,
          ]);
        });
    }
  }
}
