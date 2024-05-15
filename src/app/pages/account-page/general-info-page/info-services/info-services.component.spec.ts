import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoServicesComponent } from './info-services.component';

describe('InfoServicesComponent', () => {
  let component: InfoServicesComponent;
  let fixture: ComponentFixture<InfoServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
