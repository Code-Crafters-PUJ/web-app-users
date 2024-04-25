import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIIPageComponent } from './signup-ii-page.component';

describe('SignupIIPageComponent', () => {
  let component: SignupIIPageComponent;
  let fixture: ComponentFixture<SignupIIPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupIIPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupIIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
