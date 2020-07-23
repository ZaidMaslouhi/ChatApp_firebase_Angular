import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authServ: AuthService, private router: Router) { }

  logIn = () => {
    const email = this.email;
    const password = this.password
    this.authServ.login(email, password);
  }


}
