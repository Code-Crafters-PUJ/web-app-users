import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServicesComponent } from './components/services/services.component';
import { PlansComponent } from './components/plans/plans.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MenuComponent, GeneralInfoComponent, AboutUsComponent, ServicesComponent, PlansComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
