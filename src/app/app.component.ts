import { Component } from '@angular/core';

import { LogoComponent } from './logo/logo.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [LogoComponent, RouterLink, RouterOutlet],
})
export class AppComponent {}
