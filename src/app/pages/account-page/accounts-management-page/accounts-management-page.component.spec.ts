import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsManagementPageComponent } from './accounts-management-page.component';

describe('AccountsManagementPageComponent', () => {
  let component: AccountsManagementPageComponent;
  let fixture: ComponentFixture<AccountsManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsManagementPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
