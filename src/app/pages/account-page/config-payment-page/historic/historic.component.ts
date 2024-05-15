import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account-services/account.service";
import {NgForOf} from "@angular/common";
import { SubscriptionBilling } from '../../../../models/user-models/subscriptionBilling';

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
    let companyIdString = sessionStorage.getItem('id_company');
    if(companyIdString != null){
      this.companyId = parseInt(companyIdString);
    }
    this.accountService.getHistoricByCompanyId(this.companyId).subscribe((historic: any) => {
      console.log(historic);
      this.historic = historic;
    });
  }

}
