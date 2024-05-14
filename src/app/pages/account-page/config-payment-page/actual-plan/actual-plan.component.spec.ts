import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualPlanComponent } from './actual-plan.component';

describe('ActualPlanComponent', () => {
  let component: ActualPlanComponent;
  let fixture: ComponentFixture<ActualPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
