import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isFlipped: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showBackSide() {
    this.isFlipped = true;
  }

  showFrontSide() {
    this.isFlipped = false;
  }
}
