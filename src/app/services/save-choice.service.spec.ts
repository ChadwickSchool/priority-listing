import { TestBed } from '@angular/core/testing';

import { SaveChoiceService } from './save-choice.service';

describe('SaveChoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveChoiceService = TestBed.get(SaveChoiceService);
    expect(service).toBeTruthy();
  });
});
