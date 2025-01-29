import { Route } from '@angular/router';
import { DeckDetailsComponent } from './deck-details.component';
import { CardComponent } from '../card/card.component';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { NewCardComponent } from '../new-card/new-card.component';
import { NotFoundCardComponent } from '../not-found-card/not-found-card.component';
import { EditDeckComponent } from '../edit-deck/edit-deck.component';

export const deckRoutes: Route[] = [
  {
    path: '',
    component: DeckDetailsComponent,
    children: [
      {
        path: 'card/:cardID',
        component: CardComponent,
      },
      {
        path: 'card/:cardID/edit',
        component: EditCardComponent,
      },
      {
        path: 'create',
        component: NewCardComponent,
      },
      {
        path: 'no-cards',
        component: NotFoundCardComponent,
      },
      {
        path: 'edit',
        component: EditDeckComponent,
      },
    ],
  },
];
