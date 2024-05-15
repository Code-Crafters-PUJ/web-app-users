import { TestBed } from '@angular/core/testing';

import { AccountingAnalyticService } from './accounting-analytic.service';

describe('AccountingAnalyticService', () => {
  let service: AccountingAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
