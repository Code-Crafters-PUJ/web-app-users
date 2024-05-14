import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { PlanComponent } from './plan/plan.component';

@Component({
  selector: 'app-signup-ii-page',
  standalone: true,
  imports: [InfoComponent,PlanComponent],
  templateUrl: './signup-ii-page.component.html',
  styleUrl: './signup-ii-page.component.css'
})
export class SignupIIPageComponent {

}
