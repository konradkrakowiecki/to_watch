import { TestBed } from '@angular/core/testing';

import { TvseriesService } from './tvseries.service';

describe('TvseriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TvseriesService = TestBed.get(TvseriesService);
    expect(service).toBeTruthy();
  });
});
