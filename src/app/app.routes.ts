import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'deck/new',
    loadComponent: async () =>
      (await import('./new-deck/new-deck.component')).NewDeckComponent,
  },
  {
    path: 'deck/:deckID',
    loadChildren: async () =>
      (await import('./deck-details/deck-details.routes')).deckRoutes,
  },
  {
    path: 'decks',
    loadComponent: async () =>
      (await import('./decks/decks.component')).DecksComponent,
  },
  {
    path: '',
    redirectTo: '/decks',
    pathMatch: 'full',
  },
];
