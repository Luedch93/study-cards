import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { DecksComponent } from './decks/decks.component';
import { NewCardComponent } from './new-card/new-card.component';
import { NotFoundCardComponent } from './not-found-card/not-found-card.component';

const routes: Route[] = [
  {
    path: 'deck/:deckID',
    component: DeckDetailsComponent,
    children: [
      {
        path: 'card/:cardID',
        component: CardComponent,
      },
      {
        path: 'create',
        component: NewCardComponent,
      },
      {
        path: 'no-cards',
        component: NotFoundCardComponent,
      }
    ],
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
