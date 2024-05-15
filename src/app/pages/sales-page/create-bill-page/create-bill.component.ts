import { Component } from '@angular/core';
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.css'
})
export class CreateBillComponent {

}
