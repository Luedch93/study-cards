import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { DeckService } from '../data/deck.service';
import { Deck } from '../types/Deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit, OnDestroy {
  decks: Deck[] = [];
  private notifier = new Subject();

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.getDecks();
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  getDecks(): void {
    this.deckService.getDecks().pipe(takeUntil(this.notifier)).subscribe((decks) => (this.decks = decks));
  }
}
