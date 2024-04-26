import { Injectable } from '@angular/core';

interface SavedAccount {
  jwt: string;
  role: string;
}

const USER_KEY = 'authenticated-user';
const USER_ROLE = 'authenticated-user_role';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveAccount(ROLE:String,JWT: String): void {
    try {
      const existingUser = window.localStorage.getItem(USER_KEY);
      const existingRole = window.localStorage.getItem(USER_ROLE);
      if (existingUser !== JSON.stringify(JWT) || existingRole !== JSON.stringify(ROLE)) {
        window.localStorage.setItem(USER_KEY, JSON.stringify(JWT));
        window.localStorage.setItem(USER_ROLE, JSON.stringify(ROLE));
      }
    } catch (error) {
      console.error('Error while saving account:', error);
    }
  }

  getSavedAccount(): SavedAccount | null {
    try {
      const jwt = window.localStorage.getItem(USER_KEY);
      const role = window.localStorage.getItem(USER_ROLE);

      if (!jwt || !role) {
        return null;
      }

      return { jwt, role };
    } catch (error) {
      console.error('Error while retrieving saved account:', error);
      return null;
    }
  }

  clean(): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(USER_ROLE);
  }
  
}
