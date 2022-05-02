import { Component, OnInit } from '@angular/core';
import { DeckService } from '../data/deck.service';
import { Deck } from '../types/Deck';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks(): void {
    this.deckService.getDecks().subscribe((decks) => (this.decks = decks));
  }
}
