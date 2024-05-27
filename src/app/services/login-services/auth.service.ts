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
    var responseBody = await this.http.post(`${environment.baseURL}/Commertial/user/login`, { email: email, password: password }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }
  async signup(account: Account, company: Company, bill: SubscriptionBilling) {
    let object: any = {
      Account: {
        name: account.name,
        lastname: account.lastname,
        phone: account.phone,
        email: account.email,
        password: account.password,
        company_NIT: account.company_NIT,
        id_card: account.id_card,
        type_id_card: account.type_id_card
      },
      Company: {
        NIT: company.NIT,
        name: company.name,
        businessArea: company.businessArea,
        employeeNumber: company.employeeNumber.toString()
      },
      Bill: {
        initial_date: bill.initial_date.toISOString().split('T')[0],
        final_date: bill.final_date.toISOString().split('T')[0], 
        amount: bill.amount,
        active: bill.active,
        payment_date: bill.payment_date.toISOString().split('T')[0], 
        payment_id: parseInt(bill.payment_method,10),
        plan: bill.plan, 
        coupon: bill.coupon
      }
    };
  
    var responseBody = await this.http.post(`${environment.baseURL}/Commertial/user/register`, object, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }
  

  async isValidCoupon(code:String){
    var responseBody = await this.http.post(`${environment.baseURL}/Commertial/coupon/isValid`, { code: code }, { withCredentials: false, responseType: "text" }).toPromise();
    return responseBody;
  }

  
  
}
