import {Component, OnInit} from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { Plan } from '../../../../models/user-models/plan';
import { AccountService } from '../../../../services/account-services/account.service';
import { Router } from '@angular/router';
import { PlanService } from '../../../../services/plan-services/plan.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CarouselModule, ButtonModule, StyleClassModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans: Plan[] = [];
    plan: Plan | any;

    responsiveOptions: any[] | undefined;

    constructor(private accountService: AccountService, private router: Router, private planService: PlanService) {}

  ngOnInit() {
    this.accountService.getAllPlans().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.Plan)) {
          this.plans = response.Plan.map((plan: any) => ({
            id: plan.plan_id,
            type: plan.typePlan,
            mensual_price: plan.mensual_price,
            semestral_price: plan.semestral_price,
            anual_price: plan.anual_price,
            plan_description: plan.description,
            maxUsers: plan.num_accounts,
          }));
        } else {
          this.plans = [];
          console.error("La respuesta de la API no es un array:", response);
        }
        console.log(this.plans);
      },
      error => {
        console.error("Error al obtener los planes:", error);
        this.plans = [];
      }
    );

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }




  handleTrial(plan: Plan) {
      this.planService.setPlan(plan);
      this.router.navigate(['/register']);
    }
}
