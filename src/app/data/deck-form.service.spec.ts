import { TestBed } from '@angular/core/testing';

import { DeckFormService } from './deck-form.service';

describe('DeckFormService', () => {
  let service: DeckFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
