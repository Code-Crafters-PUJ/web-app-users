import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllSuppliersPageComponent } from './show-all-suppliers-page.component';

describe('ShowAllSuppliersPageComponent', () => {
  let component: ShowAllSuppliersPageComponent;
  let fixture: ComponentFixture<ShowAllSuppliersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllSuppliersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllSuppliersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
