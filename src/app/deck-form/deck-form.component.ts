import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { DeckFormService } from '../data/deck-form.service';
import { DeckForm } from '../types/Deck';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss'],
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckFormComponent implements OnInit {
  @Input() deckForm?: DeckForm;
  @Input() btnLabel: string = 'Create Deck';
  formValue: DeckForm = { name: '' };

  private readonly deckFormService = inject(DeckFormService);

  ngOnInit(): void {
    if (this.deckForm) this.formValue = Object.create(this.deckForm);
  }

  submit(form: NgForm) {
    const deckForm = form.value;
    this.deckFormService.setDeckForm(deckForm);
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
