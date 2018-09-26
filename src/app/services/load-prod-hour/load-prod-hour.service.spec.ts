import { TestBed } from '@angular/core/testing';

import { LoadProdHourService } from './load-prod-hour.service';

describe('LoadProdHourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadProdHourService = TestBed.get(LoadProdHourService);
    expect(service).toBeTruthy();
  });
});
