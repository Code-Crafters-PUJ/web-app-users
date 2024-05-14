import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInfoPageComponent } from './config-info-page.component';

describe('ConfigInfoPageComponent', () => {
  let component: ConfigInfoPageComponent;
  let fixture: ComponentFixture<ConfigInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigInfoPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
