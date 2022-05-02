import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DecksComponent } from './decks/decks.component';

const routes: Route[] = [
  {
    path: 'deck/:deckID/card/:cardID',
    component: CardComponent,
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
