import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIPageComponent } from './signup-i-page.component';

describe('SignupIPageComponent', () => {
  let component: SignupIPageComponent;
  let fixture: ComponentFixture<SignupIPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupIPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
