import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsPayrollPageComponent } from './show-details-payroll-page.component';

describe('ShowDetailsPayrollPageComponent', () => {
  let component: ShowDetailsPayrollPageComponent;
  let fixture: ComponentFixture<ShowDetailsPayrollPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDetailsPayrollPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDetailsPayrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
