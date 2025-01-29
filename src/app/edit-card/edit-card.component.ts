import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CardFormService } from '../data/card-form.service';
import { DeckService } from '../data/deck.service';
import { CardForm } from '../types/Card';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.scss'],
    standalone: false
})
export class EditCardComponent implements OnInit {

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
    this.getCardInfo();
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

  getCardIDFormRoute(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get('cardID'));
  }

  getCardInfo(): void {
    this.deckService.getCardById(this.getCardIDFormRoute()).pipe(
      takeUntil(this.notifier)
    ).subscribe(card => {
      if (card && card.answer && card.question) {
        this.cardForm.answer = card?.answer;
        this.cardForm.question = card?.question
      }
    })
  }

  listenFormAndSubmitCard(): void {
    const deckId = this.getDeckIDFormRoute();
    if (deckId !== 0) {
      this.cardFormService.getCardForm().pipe(
        takeUntil(this.notifier)
      ).subscribe(cardForm => {
        this.deckService.editCard(this.getCardIDFormRoute(), cardForm);
        this.router.navigate(['deck', this.getDeckIDFormRoute()])
      })
    }
  }
}
