import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPayrollsPageComponent } from './show-payrolls-page.component';

describe('ShowPayrollsPageComponent', () => {
  let component: ShowPayrollsPageComponent;
  let fixture: ComponentFixture<ShowPayrollsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPayrollsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPayrollsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
