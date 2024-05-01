import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Account } from '../../models/user-models/account';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }


  async login(email: string, password: string) {
    var responseBody = await this.http.post(`${environment.baseURL}/user/login`, { email: email, password: password }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;

  }

  async signup(account: Account) {
    var responseBody = await this.http.post(`${environment.baseURL}/user/signin`, { account: account }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }
  
}
