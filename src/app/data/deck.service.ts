import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Deck } from '../types/Deck';
import { DECKS } from './contants';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor() {}

  getDecks(): Observable<Deck[]> {
    return of(DECKS);
  }
}
