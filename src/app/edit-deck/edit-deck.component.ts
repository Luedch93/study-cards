import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DeckFormService } from '../data/deck-form.service';
import { DeckService } from '../data/deck.service';
import { DeckForm } from '../types/Deck';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit, OnDestroy {

  deckForm: DeckForm = {name: ''};
  private notifier: Subject<any> = new Subject();

  constructor(
    private deckFormService: DeckFormService,
    private deckService: DeckService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listenFormAndSubmitDeck();
    this.getDeckInfo();
  }

  ngOnDestroy(): void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  listenFormAndSubmitDeck(): void {
    this.deckFormService.getDeckForm().pipe(
      takeUntil(this.notifier)
    ).subscribe(deckForm => {
      this.deckService.editDeck(this.getDeckIdFromURL(), deckForm);
      this.router.navigate(['deck', this.getDeckIdFromURL()]);
    })
  }

  getDeckIdFromURL(): number {
    return (this.activatedRoute.parent) ?
      Number(this.activatedRoute.parent.snapshot.paramMap.get('deckID')) :
      0;
  }

  getDeckInfo(): void {
    this.deckService.getDeckById(this.getDeckIdFromURL()).pipe(
      takeUntil(this.notifier)
    ).subscribe(deck => {
      if (deck && deck.name)
        this.deckForm.name = deck?.name;
    })
  }
}
