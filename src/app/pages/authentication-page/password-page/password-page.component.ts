import { Component } from '@angular/core';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-password-page',
  standalone: true,
  imports: [PasswordComponent],
  templateUrl: './password-page.component.html',
  styleUrl: './password-page.component.css'
})
export class PasswordPageComponent {

}
