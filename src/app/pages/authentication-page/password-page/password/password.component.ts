import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  constructor(private router: Router) {} 

  cancel() {
    
    this.router.navigate(['/login']);
  }

  continue() {
    
    this.router.navigate(['/login']);
  }
}
