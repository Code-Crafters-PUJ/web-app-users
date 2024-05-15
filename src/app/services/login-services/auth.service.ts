import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Account } from '../../models/user-models/account';
import { Company } from '../../models/user-models/company';
import { SubscriptionBilling } from '../../models/user-models/subscriptionBilling';




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
    var responseBody = await this.http.post(`${environment.baseURL}/user/createRootUser`, { account: account }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }

  async createCompany(company: Company) {
    var responseBody = await this.http.post(`${environment.baseURL}/company/createCompany`, { company: company }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }

  async registerPayment(bill:SubscriptionBilling){
    var responseBody = await this.http.post(`${environment.baseURL}/bill/createBill`, { bill: bill }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }

  async isValidCoupon(code:String){
    var responseBody = await this.http.post(`${environment.baseURL}/coupon/isValid`, { code: code }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }

  
  
}
