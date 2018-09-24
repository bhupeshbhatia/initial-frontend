import { TestBed } from '@angular/core/testing';

import { LoadNumprodDataService } from './load-numprod-data.service';

describe('LoadNumprodDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadNumprodDataService = TestBed.get(LoadNumprodDataService);
    expect(service).toBeTruthy();
  });
});
