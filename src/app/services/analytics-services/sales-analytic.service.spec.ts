import { TestBed } from '@angular/core/testing';

import { SalesAnalyticService } from './sales-analytic.service';

describe('SalesAnalyticService', () => {
  let service: SalesAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
