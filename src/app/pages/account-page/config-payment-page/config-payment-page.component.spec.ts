import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPaymentPageComponent } from './config-payment-page.component';

describe('ConfigPaymentPageComponent', () => {
  let component: ConfigPaymentPageComponent;
  let fixture: ComponentFixture<ConfigPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigPaymentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
