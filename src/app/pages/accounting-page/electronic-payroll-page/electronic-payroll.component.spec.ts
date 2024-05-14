import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicPayrollComponent } from './electronic-payroll.component';

describe('ElectronicPayrollComponent', () => {
  let component: ElectronicPayrollComponent;
  let fixture: ComponentFixture<ElectronicPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicPayrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
