import { TestBed, inject } from '@angular/core/testing';

import { PostDeleteDataService } from './post-delete-data.service';

describe('PostDeleteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDeleteDataService]
    });
  });

  it('should be created', inject([PostDeleteDataService], (service: PostDeleteDataService) => {
    expect(service).toBeTruthy();
  }));
});
