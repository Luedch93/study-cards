import { TestBed } from '@angular/core/testing';

import { CardFormService } from './card-form.service';

describe('CardFormService', () => {
  let service: CardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
