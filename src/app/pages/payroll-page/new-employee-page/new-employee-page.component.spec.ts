import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeePageComponent } from './new-employee-page.component';

describe('NewEmployeePageComponent', () => {
  let component: NewEmployeePageComponent;
  let fixture: ComponentFixture<NewEmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmployeePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
