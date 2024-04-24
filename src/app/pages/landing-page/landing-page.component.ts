import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
