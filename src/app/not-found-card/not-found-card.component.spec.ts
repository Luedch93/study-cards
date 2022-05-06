import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundCardComponent } from './not-found-card.component';

describe('NotFoundCardComponent', () => {
  let component: NotFoundCardComponent;
  let fixture: ComponentFixture<NotFoundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
