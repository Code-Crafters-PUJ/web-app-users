import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';

@Component({
  selector: 'app-electronic-bill',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './electronic-bill.component.html',
  styleUrl: './electronic-bill.component.css'
})
export class ElectronicBillComponent {

}
