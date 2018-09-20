import { TestBed, inject } from '@angular/core/testing';

import { PostInventoryDataService } from './post-inventory-data.service';

describe('PostInventoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostInventoryDataService]
    });
  });

  it('should be created', inject([PostInventoryDataService], (service: PostInventoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
