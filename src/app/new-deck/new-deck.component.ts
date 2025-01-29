import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DeckFormService } from '../data/deck-form.service';
import { DeckService } from '../data/deck.service';
import { DeckForm } from '../types/Deck';

@Component({
    selector: 'app-new-deck',
    templateUrl: './new-deck.component.html',
    styleUrls: ['./new-deck.component.scss'],
    standalone: false
})
export class NewDeckComponent implements OnInit, OnDestroy {

  deckForm: DeckForm = {name: ''};
  private notifier: Subject<any> = new Subject();

  constructor(
    private deckFormService: DeckFormService,
    private deckService: DeckService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listenFormAndSubmitDeck();
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  listenFormAndSubmitDeck(): void {
    this.deckFormService.getDeckForm().pipe(
      takeUntil(this.notifier)
    ).subscribe(deckForm => {
      this.deckService.addDeck(deckForm);
      this.navigateToDeckList();
    })
  }

  navigateToDeckList() {
    this.router.navigate(['decks']);
  }
}
