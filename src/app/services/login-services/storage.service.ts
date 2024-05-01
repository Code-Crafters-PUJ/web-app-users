import { Injectable } from '@angular/core';

interface SavedAccount {
  jwt: string;
  role: string;
  id_company: string;
  id_account: string;
}

const USER_KEY = 'authenticated-user';
const USER_ROLE = 'authenticated-user_role';
const ID_COMPANY = 'authenticated-id-company';
const ID_ACCOUNT = 'authenticated-id-account';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAccount(IDACC: String, IDCOMP: String, ROLE:String, JWT: String): void {
    try {
      const existingUser = window.localStorage.getItem(USER_KEY);
      const existingRole = window.localStorage.getItem(USER_ROLE);
      const existingCompany = window.localStorage.getItem(ID_COMPANY);
      const existingAccount = window.localStorage.getItem(ID_ACCOUNT);

      if (existingUser !== JSON.stringify(JWT) || existingRole !== JSON.stringify(ROLE) || existingCompany !== JSON.stringify(IDACC) || existingAccount !== JSON.stringify(IDCOMP)) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(JWT));
        window.localStorage.setItem(USER_ROLE, JSON.stringify(ROLE));
        window.localStorage.setItem(ID_COMPANY,JSON.stringify(ID_COMPANY));
        window.localStorage.setItem(ID_ACCOUNT,JSON.stringify(ID_ACCOUNT));
      }
    } catch (error) {
      console.error('Error while saving account:', error);
    }
  }

  getSavedAccount(): SavedAccount | null {
    try {
      const jwt = window.localStorage.getItem(USER_KEY);
      const role = window.localStorage.getItem(USER_ROLE);
      const id_company = window.localStorage.getItem(ID_COMPANY);
      const id_account = window.localStorage.getItem(ID_ACCOUNT);

      if (!jwt || !role || !id_company || !id_account) {
        return null;
      }

      return { jwt, role, id_company, id_account };
    } catch (error) {
      console.error('Error while retrieving saved account:', error);
      return null;
    }
  }

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(USER_ROLE);
    window.localStorage.removeItem(ID_COMPANY);
    window.localStorage.removeItem(ID_ACCOUNT);
  }
  
}
