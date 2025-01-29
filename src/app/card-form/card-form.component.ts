import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardFormService } from '../data/card-form.service';
import { CardForm } from '../types/Card';

@Component({
    selector: 'app-card-form',
    templateUrl: './card-form.component.html',
    styleUrls: ['./card-form.component.scss'],
    standalone: false
})
export class CardFormComponent implements OnInit {

  @Input() cardForm?: CardForm;
  @Input() btnLabel: string = "Create Card"
  formValue: CardForm = {answer: '', question: ''}

  constructor(private cardFormService: CardFormService) { }

  ngOnInit(): void {
    if (this.cardForm)
      this.formValue = Object.create(this.cardForm);
  }

  submit(form: NgForm) {
    const cardForm = form.value;
    this.cardFormService.setCardForm(cardForm)
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
