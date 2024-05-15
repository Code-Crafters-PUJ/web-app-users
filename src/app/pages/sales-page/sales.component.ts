import { Component } from '@angular/core';
import {SidebarComponent} from "../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

}
