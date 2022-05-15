import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { DecksComponent } from './decks/decks.component';
import { DeckDetailsComponent } from './deck-details/deck-details.component';
import { NotFoundCardComponent } from './not-found-card/not-found-card.component';
import { MessagesComponent } from './messages/messages.component';
import { CardFormComponent } from './card-form/card-form.component';
import { LogoComponent } from './logo/logo.component';
import { CardNavigationComponent } from './card-navigation/card-navigation.component';
import { NewCardComponent } from './new-card/new-card.component';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { NewDeckComponent } from './new-deck/new-deck.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';
import { EditCardComponent } from './edit-card/edit-card.component';

@NgModule({
  declarations: [AppComponent, CardComponent, DecksComponent, DeckDetailsComponent, NotFoundCardComponent, MessagesComponent, CardFormComponent, LogoComponent, CardNavigationComponent, NewCardComponent, DeckFormComponent, NewDeckComponent, EditDeckComponent, EditCardComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
