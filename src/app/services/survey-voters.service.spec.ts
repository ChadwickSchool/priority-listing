import { TestBed } from '@angular/core/testing';

import { SurveyVotersService } from './survey-voters.service';

describe('SurveyVotersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyVotersService = TestBed.get(SurveyVotersService);
    expect(service).toBeTruthy();
  });
});
