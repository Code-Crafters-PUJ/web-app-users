import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../../Models/user-models/plan";
import {AccountService} from "../../../../services/account-services/account.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-info-plan',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './info-plan.component.html',
  styleUrl: './info-plan.component.css'
})
export class InfoPlanComponent implements OnInit {

  companyId: number = -1;
  actualPlan : Plan = {
    id: 0,
    type: '',
    price: 0,
    plan_description: '',
    maxUsers: 0
  }
  plansAvailable: Plan[] =[]


  constructor(
    private accountService: AccountService
  ) { }


  ngOnInit(): void {
    let companyIdString = sessionStorage.getItem('companyId');
    if(companyIdString != null){
      this.companyId = parseInt(companyIdString);
    }
    this.companyId = 1;
    this.accountService.getPlanByCompanyId(this.companyId).subscribe((plan: Plan) => {
      this.actualPlan = plan;
    });
    this.accountService.getAllPlans().subscribe((plans: Plan[]) => {
      this.plansAvailable = plans;
      console.log("los planes son", this.plansAvailable);
      //detect the plan that the company has
      for(let i = 0; i < this.plansAvailable.length; i++){
        if(this.plansAvailable[i].id == this.actualPlan.id){
          this.plansAvailable.splice(i, 1);
        }
      }
      console.log("los planes ahora son", this.plansAvailable);
    });

  }

}
