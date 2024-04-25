import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsEmployeePageComponent } from './show-details-employee-page.component';

describe('ShowDetailsEmployeePageComponent', () => {
  let component: ShowDetailsEmployeePageComponent;
  let fixture: ComponentFixture<ShowDetailsEmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDetailsEmployeePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDetailsEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
