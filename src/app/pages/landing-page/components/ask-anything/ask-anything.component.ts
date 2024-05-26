import { CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ask-anything',
  standalone: true,
  imports: [FormsModule,
    CurrencyPipe,
    NgIf],
  templateUrl: './ask-anything.component.html',
  styleUrl: './ask-anything.component.css'
})
export class AskAnythingComponent {

  sendPetition() {
    const formData = this.obtainData();
    if (this.verifyContent(formData)) {
      if (formData['acceptTerms']) {
        this.handleSuccessfulAuthentication();
      } else {
        Swal.fire({
          title: 'Aviso',
          text: 'Debe aceptar la Política de Tratamiento de Datos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    } else {
      this.handleFieldErrors(formData);
    }
  }

  private handleFieldErrors(data: { [x: string]: string }) {
    if (!data['acceptTerms']) {
      Swal.fire({
        title: 'Error',
        text: 'Debe aceptar la Política de Tratamiento de Datos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.isValidEmail(data['email'])) {
      Swal.fire({
        title: 'Error',
        text: 'El correo electrónico ingresado no es válido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.isValidPhone(data['phone'])) {
      Swal.fire({
        title: 'Error',
        text: 'El número de teléfono ingresado no es válido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const requiredFields = ['city', 'comoSeEntero', 'email', 'enterprise', 'name', 'phone'];
    const emptyFields = requiredFields.filter(field => !data[field]);

    if (emptyFields.length > 0) {
      Swal.fire({
        title: 'Error',
        text: `Los siguientes campos son obligatorios: ${emptyFields.join(', ')}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  private handleSuccessfulAuthentication() {
    Swal.fire({
      title: '¡Gracias por contactarte con nosotros!',
      text: 'Envío exitoso',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  private obtainData() {
    const formData = new FormData(document.querySelector('form')!);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const acceptTerms = formData.get('acceptTerms');
    data['acceptTerms'] = acceptTerms === 'on';

    return data;
  }

  private verifyContent(data: { [x: string]: string }) {
    const requiredFields = ['acceptTerms', 'city', 'comoSeEntero', 'email', 'enterprise', 'name', 'phone'];
    const isComplete = requiredFields.every(field => data[field]);

    const isEmailValid = this.isValidEmail(data['email']);
    const isPhoneValid = this.isValidPhone(data['phone']);

    return isComplete && isEmailValid && isPhoneValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(phone);
  }
}
