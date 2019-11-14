import { TestBed } from '@angular/core/testing';

import { GetOptionsService } from './get-options.service';

describe('GetOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetOptionsService = TestBed.get(GetOptionsService);
    expect(service).toBeTruthy();
  });
});
