import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { DeckService } from '../data/deck.service';
import { Card } from '../types/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  isFlipped: WritableSignal<boolean> = signal(false);
  cardId: WritableSignal<number | undefined> = signal(undefined);
  card: WritableSignal<Card | undefined> = signal(undefined);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly deckService = inject(DeckService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.isFlipped.set(false);
      this.getCardIdInRoute();
      this.getCardById();
    });
  }

  getCardIdInRoute() {
    this.cardId.set(
      Number(this.activatedRoute.snapshot.paramMap.get('cardID'))
    );
  }

  getCardById() {
    if (this.cardId()) {
      firstValueFrom(
        this.deckService.getCardById(this.cardId() as number)
      ).then((card) => this.card.set(card));
    }
  }

  showBackSide() {
    this.isFlipped.set(true);
  }

  showFrontSide() {
    this.isFlipped.set(false);
  }
}
