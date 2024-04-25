import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { GeneralInfoComponent } from './components/general-info/general-info.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MenuComponent, GeneralInfoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
