import { Component } from '@angular/core';
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-show-all-products',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './show-all-products.component.html',
  styleUrl: './show-all-products.component.css'
})
export class ShowAllProductsComponent {

}
