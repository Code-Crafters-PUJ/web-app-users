import { Component } from '@angular/core';
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
export class PlansComponent {
  
    plans: Plan[] = [];
    plan: Plan | any;

    responsiveOptions: any[] | undefined;

    constructor(private accountService: AccountService, private router: Router, private planService: PlanService) {}

    ngOnInit() {
      this.accountService.getAllPlans().subscribe((plans: Plan[]) => {
        this.plans = plans;
        console.log(this.plans);
        
      });

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
