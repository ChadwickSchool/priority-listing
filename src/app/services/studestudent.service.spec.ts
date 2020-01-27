import { TestBed } from '@angular/core/testing';

import { StudestudentService } from './studestudent.service';

describe('StudestudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudestudentService = TestBed.get(StudestudentService);
    expect(service).toBeTruthy();
  });
});
