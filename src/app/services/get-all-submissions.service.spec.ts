import { TestBed } from '@angular/core/testing';

import { GetAllChoicesService } from './get-all-submissions.service';

describe('GetAllChoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllChoicesService = TestBed.get(GetAllChoicesService);
    expect(service).toBeTruthy();
  });
});
