import { TestBed } from '@angular/core/testing';

import { LoadAvgprodDataService } from './load-avgprod-data.service';

describe('LoadAvgprodDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadAvgprodDataService = TestBed.get(LoadAvgprodDataService);
    expect(service).toBeTruthy();
  });
});
