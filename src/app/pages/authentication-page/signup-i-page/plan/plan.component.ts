import { Component } from '@angular/core';
import { Plan } from '../../../../models/user-models/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../../services/plan-services/plan.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  
  plan?: Plan;

  constructor(private router: Router, private planService: PlanService) { }

  ngOnInit(): void {
    
    const planString = localStorage.getItem('plan');
    if (planString) {
      this.plan = JSON.parse(planString);
    } else {
      
      this.planService.getPlan().subscribe(plan => {
        if (plan !== null){
          this.plan = plan;
          
          localStorage.setItem('plan', JSON.stringify(plan));
        }
      });
    }
  }

}
