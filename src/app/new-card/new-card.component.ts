import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CardFormService } from '../data/card-form.service';
import { DeckService } from '../data/deck.service';
import { CardForm } from '../types/Card';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit, OnDestroy {

  cardForm: CardForm = {answer: '', question: ''};
  private notifier: Subject<any> = new Subject();

  constructor(
    private cardFormService: CardFormService,
    private deckService: DeckService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listenFormAndSubmitCard();
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  getDeckIDFormRoute(): number {
    return (this.activatedRoute.parent) ?
      Number(this.activatedRoute.parent.snapshot.paramMap.get('deckID')) :
      0
  }

  listenFormAndSubmitCard(): void {
    const deckId = this.getDeckIDFormRoute();
    if (deckId !== 0) {
      this.cardFormService.getCardForm().pipe(
        takeUntil(this.notifier)
      ).subscribe(cardForm => {
        this.deckService.addCardToDeck(deckId, cardForm);
        this.router.navigate(['deck', this.getDeckIDFormRoute()])
      })
    }
  }
}
