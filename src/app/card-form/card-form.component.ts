import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../data/deck.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {

  private deckId?: number

  constructor(private deckService: DeckService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.deckId = Number(this.activatedRoute.parent?.snapshot.paramMap.get('deckID'));
  }

  submit(form: NgForm) {
    const {answer, question} = form.value;
    if(this.deckId)
      this.deckService.addCardToDeck(this.deckId, {answer, question});
      this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
