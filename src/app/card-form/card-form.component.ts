import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { CardFormService } from '../data/card-form.service';
import { CardForm } from '../types/Card';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  imports: [FormsModule],
})
export class CardFormComponent implements OnInit {
  @Input() cardForm?: CardForm;
  @Input() btnLabel: string = 'Create Card';
  formValue: CardForm = { answer: '', question: '' };
  private readonly cardFormService = inject(CardFormService);

  ngOnInit(): void {
    if (this.cardForm) this.formValue = Object.create(this.cardForm);
  }

  submit(form: NgForm) {
    const cardForm = form.value;
    this.cardFormService.setCardForm(cardForm);
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
