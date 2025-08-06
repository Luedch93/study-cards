import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-card',
  templateUrl: './not-found-card.component.html',
  styleUrls: ['./not-found-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundCardComponent {}
