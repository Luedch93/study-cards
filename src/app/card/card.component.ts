import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../data/deck.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isFlipped: boolean = false;
  cardId?: number;
  card?: Card;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.getCardIdInRoute();
      this.getCardById();
    });
  }

  getCardIdInRoute() {
    this.cardId = Number(this.activatedRoute.snapshot.paramMap.get('cardID'));
  }

  getCardById() {
    if (this.cardId)
      this.deckService
        .getCardById(this.cardId)
        .subscribe((card) => (this.card = card));
  }

  showBackSide() {
    this.isFlipped = true;
  }

  showFrontSide() {
    this.isFlipped = false;
  }
}
