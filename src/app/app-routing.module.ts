import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DecksComponent } from './decks/decks.component';

const routes: Route[] = [
  {
    path: 'deck/:deckID',
    component: DeckDetailsComponent,
    children: [
      {
        path: 'card/:cardID',
        component: CardComponent,
      }
    ]
  },
  {
    path: 'decks',
    component: DecksComponent,
  },
  {
    path: '',
    redirectTo: '/decks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
