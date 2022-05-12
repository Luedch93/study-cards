import { TestBed } from '@angular/core/testing';

import { DeckManagementService } from './deck-management.service';

describe('DeckManagmentService', () => {
  let service: DeckManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
