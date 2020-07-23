import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;
  errorMsg: string;

  constructor(private authServ: AuthService, private router: Router) { }

  signup = () => {
    const email = this.email;
    const password = this.password
    const displayName = this.displayName;
    this.authServ.signup(email, password, displayName);
  }

}
