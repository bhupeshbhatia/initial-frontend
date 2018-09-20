import { TestBed, inject } from '@angular/core/testing';

import { PostDateDataService } from './post-date-data.service';

describe('PostDateDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDateDataService]
    });
  });

  it('should be created', inject([PostDateDataService], (service: PostDateDataService) => {
    expect(service).toBeTruthy();
  }));
});
