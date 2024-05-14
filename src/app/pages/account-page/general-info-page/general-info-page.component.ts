import { Component } from '@angular/core';
import { InfoPlanComponent } from './info-plan/info-plan.component';
import { InfoProfileComponent } from './info-profile/info-profile.component';
import { InfoSupportComponent } from './info-support/info-support.component';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';
import { InfoServicesComponent } from './info-services/info-services.component';

@Component({
  selector: 'app-general-info-page',
  standalone: true,
  imports: [InfoPlanComponent,InfoProfileComponent,InfoSupportComponent,SidebarComponent, InfoServicesComponent],
  templateUrl: './general-info-page.component.html',
  styleUrl: './general-info-page.component.css'
})
export class GeneralInfoPageComponent {

}
