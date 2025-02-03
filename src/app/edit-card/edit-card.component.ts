import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CardFormService } from '../data/card-form.service';
import { DeckService } from '../data/deck.service';
import { CardForm } from '../types/Card';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
  imports: [CardFormComponent],
})
export class EditCardComponent {
  cardForm: CardForm = { answer: '', question: '' };

  private readonly cardFormService = inject(CardFormService);
  private readonly deckService = inject(DeckService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    this.listenFormAndSubmitCard();
    this.getCardInfo();
  }

  getDeckIDFormRoute(): number {
    return this.activatedRoute.parent
      ? Number(this.activatedRoute.parent.snapshot.paramMap.get('deckID'))
      : 0;
  }

  getCardIDFormRoute(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('cardID'));
  }

  getCardInfo(): void {
    this.deckService
      .getCardById(this.getCardIDFormRoute())
      .pipe(takeUntilDestroyed())
      .subscribe((card) => {
        if (card && card.answer && card.question) {
          this.cardForm.answer = card?.answer;
          this.cardForm.question = card?.question;
        }
      });
  }

  listenFormAndSubmitCard(): void {
    const deckId = this.getDeckIDFormRoute();
    if (deckId !== 0) {
      this.cardFormService
        .getCardForm()
        .pipe(takeUntilDestroyed())
        .subscribe((cardForm) => {
          this.deckService.editCard(this.getCardIDFormRoute(), cardForm);
          this.router.navigate(['deck', this.getDeckIDFormRoute()]);
        });
    }
  }
}
