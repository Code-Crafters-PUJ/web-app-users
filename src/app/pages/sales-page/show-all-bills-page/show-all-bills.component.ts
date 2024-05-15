import { Component } from '@angular/core';
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-show-all-bills',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './show-all-bills.component.html',
  styleUrl: './show-all-bills.component.css'
})
export class ShowAllBillsComponent {

}
