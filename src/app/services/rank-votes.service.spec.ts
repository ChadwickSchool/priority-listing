import { TestBed } from '@angular/core/testing';

import { RankVotesService } from './rank-votes.service';

describe('RankVotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RankVotesService = TestBed.get(RankVotesService);
    expect(service).toBeTruthy();
  });
});
