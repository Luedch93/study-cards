import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { provideRouter } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(CardComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display nothing', () => {
    expect(fixture.nativeElement.querySelector('.scene')).toBeNull();
  });

  it('should display card elements', () => {
    component.card.set({
      answer: 'Answer text',
      deckId: 1,
      id: 1,
      question: 'Question text',
    });

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.scene')).not.toBeNull();
    expect(
      fixture.nativeElement
        .querySelector('.scene_card--back-side')
        .innerText.trim()
    ).toContain('Answer text');
    expect(
      fixture.nativeElement
        .querySelector('.scene_card--front-side')
        .innerText.trim()
    ).toContain('Question text');
  });
});
