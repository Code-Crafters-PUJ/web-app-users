import { Component } from '@angular/core';
import { InfoPlanComponent } from './info-plan/info-plan.component';
import { InfoProfileComponent } from './info-profile/info-profile.component';
import { InfoSupportComponent } from './info-support/info-support.component';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';

@Component({
  selector: 'app-general-info-page',
  standalone: true,
  imports: [InfoPlanComponent,InfoProfileComponent,InfoSupportComponent,SidebarComponent],
  templateUrl: './general-info-page.component.html',
  styleUrl: './general-info-page.component.css'
})
export class GeneralInfoPageComponent {

}
