import { TestBed } from '@angular/core/testing';

import { GetSurveyService } from './get-options.service';

describe('GetOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSurveyService = TestBed.get(GetSurveyService);
    expect(service).toBeTruthy();
  });

});
