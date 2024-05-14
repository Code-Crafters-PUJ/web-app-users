import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayrollPageComponent } from './new-payroll-page.component';

describe('NewPayrollPageComponent', () => {
  let component: NewPayrollPageComponent;
  let fixture: ComponentFixture<NewPayrollPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPayrollPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPayrollPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
