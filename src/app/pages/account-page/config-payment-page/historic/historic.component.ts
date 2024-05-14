import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account-services/account.service";
import {SubscriptionBilling} from "../../../../Models/user-models/subscriptionBilling";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-historic',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.css'
})
export class HistoricComponent implements OnInit{
  companyId: number = -1;
  historic: SubscriptionBilling[] = [];

  constructor(
    private accountService: AccountService

  ) { }

  ngOnInit(): void {
    let companyIdString = sessionStorage.getItem('companyId');
    if(companyIdString != null){
      this.companyId = parseInt(companyIdString);
    }
    this.accountService.getHistoricByCompanyId(this.companyId).subscribe((historic: any) => {
      console.log(historic);
      this.historic = historic;
    });
  }

}
