import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardForm } from '../types/CardForm';

@Injectable({
  providedIn: 'root'
})
export class CardFormService {

  private cardForm$: Subject<CardForm> = new Subject<CardForm>()

  constructor() { }

  setCardForm(cardForm: CardForm): void {
    this.cardForm$.next(cardForm);
  }

  getCardForm(): Subject<CardForm> {
    return this.cardForm$;
  }
}
