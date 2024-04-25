import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSupplierDetailsComponent } from './show-supplier-details.component';

describe('ShowSupplierDetailsComponent', () => {
  let component: ShowSupplierDetailsComponent;
  let fixture: ComponentFixture<ShowSupplierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSupplierDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSupplierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
