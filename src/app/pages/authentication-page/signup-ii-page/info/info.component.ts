import { Component } from '@angular/core';
import { AuthService } from '../../../../services/login-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  constructor(private authService: AuthService, private router: Router) { }

  continue(): void{
    this.router.navigate(['/home/admin/myaccount']);
  }
}
