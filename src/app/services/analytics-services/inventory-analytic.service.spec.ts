import { TestBed } from '@angular/core/testing';

import { InventoryAnalyticService } from './inventory-analytic.service';

describe('InventoryAnalyticService', () => {
  let service: InventoryAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
