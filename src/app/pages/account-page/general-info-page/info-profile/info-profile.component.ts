import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account-services/account.service";
import {Company} from "../../../../models/user-models/company";

@Component({
  selector: 'app-info-profile',
  standalone: true,
  imports: [],
  templateUrl: './info-profile.component.html',
  styleUrl: './info-profile.component.css'
})
export class InfoProfileComponent implements OnInit {
  companyId: number = -1;
  company: Company = {
    id: 0,
    NIT: '',
    name: '',
    businessArea: '',
    employeeNumber: 0,
    electronicPayroll: 0,
    electronicBill: 0,
    planId: 0
  };
  rootProfile = {
    name: "",
    lastname: "",
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
    this.accountService.getRootAccount(this.companyId).subscribe(profile => {
      this.rootProfile = profile;
    });


  }

}
