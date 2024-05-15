import { Component } from '@angular/core';
import { Company } from '../../../../models/user-models/company';
import { AccountService } from '../../../../services/account-services/account.service';

@Component({
  selector: 'app-info-support',
  standalone: true,
  imports: [],
  templateUrl: './info-support.component.html',
  styleUrl: './info-support.component.css'
})
export class InfoSupportComponent {

  companyId: number = -1;
  company: Company = {
    NIT: '',
    name: '',
    businessArea: '',
    employeeNumber: 0,
  };
  rootAccount = {
    name: "",
    lastname: "",
    typeCardId: "",
    cardId: "",
    phone: "",
    email: "",
    password: "",
    businessNit: "",
    role: "",
  };

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    let companyIdString = sessionStorage.getItem('companyId');
    if (companyIdString != null) {
      this.companyId = parseInt(companyIdString);
    }
    //TODO: Remove companyId manual assignment
    this.companyId = 1;
    this.accountService.getCompanyById(this.companyId).subscribe((company: Company) => {
      this.company = company;
    });
    this.accountService.getRootAccount(this.companyId).subscribe(account => {
      this.rootAccount = account;
    });


  }
  
}
