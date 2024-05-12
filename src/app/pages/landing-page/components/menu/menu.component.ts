import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../../services/plan-services/plan.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router, private planService: PlanService) { }

  handleFreeTrialClick() {
    this.planService.getFreeTrial().subscribe(plan => {
      this.planService.setPlan(plan);
      this.router.navigate(['/register']);
    });
  }


}
