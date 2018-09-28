import { TestBed, inject } from '@angular/core/testing'

import { LoadInventoryJsonService } from './load-inventory-json.service'

describe('LoadInventoryJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadInventoryJsonService]
    })
  })

  it('should be created', inject([LoadInventoryJsonService], (service: LoadInventoryJsonService) => {
    expect(service).toBeTruthy()
  }))
})
