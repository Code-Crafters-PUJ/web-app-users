import {Component, OnInit} from '@angular/core';
import {Plan} from "../../../../models/user-models/plan";
import {AccountService} from "../../../../services/account-services/account.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-actual-plan',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './actual-plan.component.html',
  styleUrl: './actual-plan.component.css'
})
export class ActualPlanComponent implements OnInit{
  companyId: number = -1;
  actualPlan : Plan = {
    id: 0,
    type: '',
    mensual_price: 0,
    semestral_price: 0,
    anual_price: 0,
    plan_description: '',
    maxUsers: 0
  }
  plansAvailable: Plan[] =[]
  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    let companyIdString = sessionStorage.getItem('id_company');
    if(companyIdString != null){
      this.companyId = parseInt(companyIdString);
    }
    //TODO: Remove companyId manual assignment
    this.companyId = 1;
    this.accountService.getPlanByCompanyId(this.companyId).subscribe((plan: Plan) => {
      this.actualPlan = plan;
    });
    this.accountService.getAllPlans().subscribe((plans: Plan[]) => {
      this.plansAvailable = plans;
      //detect the plan that the company has
      for(let i = 0; i < this.plansAvailable.length; i++){
        if(this.plansAvailable[i].id == this.actualPlan.id){
          this.plansAvailable.splice(i, 1);
        }
      }
    });

  }

}
