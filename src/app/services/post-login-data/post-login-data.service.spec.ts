import { TestBed, inject } from '@angular/core/testing';

import { PostLoginDataService } from './post-login-data.service';

describe('PostLoginDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostLoginDataService]
    });
  });

  it('should be created', inject([PostLoginDataService], (service: PostLoginDataService) => {
    expect(service).toBeTruthy();
  }));
});
