import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginUserModel } from '../../model/login';
import { LoginUser } from '../../services/login-user';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  formLogin!: FormGroup;
  fb = inject(FormBuilder);
  loginServices = inject(LoginUser);

  constructor() {
    this.formLogin = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onLoginUser(){
    const USER: LoginUserModel = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.loginServices.loginUser(USER).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

}
