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
  

  sendPetition(){

    let data = this.obtainData();
    console.log(data);
    if (this.verifyContent(data)){
      this.handleSuccessfulAuthentication()
    }else{
      this.handleFailedAuthentication()
    }
  }

  private handleFailedAuthentication() {
    Swal.fire({
      title: 'Uppss algo pasó',
      text: "Error en los datos ingresados, por favor verifique los campos",
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  }

  private handleSuccessfulAuthentication(){
    Swal.fire({
      title: '¡Gracias por contactarte con nosotros!',
      text: "Envío exitoso",
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  // Get Data
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

  // Verification
  private verifyContent(data: { [x: string]: string; }) {
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
      
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
  }
}
