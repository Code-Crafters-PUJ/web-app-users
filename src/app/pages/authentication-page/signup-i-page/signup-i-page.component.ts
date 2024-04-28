import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { PlanComponent } from './plan/plan.component';

@Component({
  selector: 'app-signup-i-page',
  standalone: true,
  imports: [InfoComponent,PlanComponent],
  templateUrl: './signup-i-page.component.html',
  styleUrl: './signup-i-page.component.css'
})
export class SignupIPageComponent {

}
