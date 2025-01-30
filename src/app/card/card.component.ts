import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { firstValueFrom } from 'rxjs';

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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.isFlipped = false;
      this.getCardIdInRoute();
      this.getCardById();
    });
  }

  getCardIdInRoute() {
    this.cardId = Number(this.activatedRoute.snapshot.paramMap.get('cardID'));
  }

  getCardById() {
    if (this.cardId) {
      firstValueFrom(this.deckService.getCardById(this.cardId)).then(
        (card) => (this.card = card)
      );
    }
  }

  showBackSide() {
    this.isFlipped = true;
  }

  showFrontSide() {
    this.isFlipped = false;
  }
}
