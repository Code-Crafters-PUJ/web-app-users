import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingRecordComponent } from './accounting-record.component';

describe('AccountingRecordComponent', () => {
  let component: AccountingRecordComponent;
  let fixture: ComponentFixture<AccountingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
