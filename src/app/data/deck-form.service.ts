import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DeckForm } from '../types/Deck';

@Injectable({
  providedIn: 'root'
})
export class DeckFormService {

  private deckForm$: Subject<DeckForm> = new Subject<DeckForm>()

  constructor() { }

  setDeckForm(deckForm: DeckForm): void {
    this.deckForm$.next(deckForm);
  }

  getDeckForm(): Subject<DeckForm> {
    return this.deckForm$;
  }
}
