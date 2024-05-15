import { TestBed } from '@angular/core/testing';

import { PayrollAnalyticService } from './payroll-analytic.service';

describe('PayrollAnalyticService', () => {
  let service: PayrollAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
