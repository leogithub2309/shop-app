import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginUserModel } from '../model/login';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class LoginUser {

  private readonly urlLogin = "http://localhost:3000/";
  private readonly http = inject(HttpClient);

  loginUser(form: LoginUserModel){
    return this.http.post(this.urlLogin+"login", form);
  }

  registerUser(form: Register){
    return this.http.post(this.urlLogin+"register", form);
  }
  
}
