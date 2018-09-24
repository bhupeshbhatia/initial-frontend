import { TestBed } from '@angular/core/testing';

import { LoadWeightDistDataService } from './load-weight-dist-data.service';

describe('LoadWeightDistDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadWeightDistDataService = TestBed.get(LoadWeightDistDataService);
    expect(service).toBeTruthy();
  });
});
