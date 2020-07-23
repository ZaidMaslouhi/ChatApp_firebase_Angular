import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  authState: any;
  navbar = null;
  // email: string;
  // displayName: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, 
              private router: Router) 
  { 
    this.user = this.afAuth.authState;
  }

  
  currentUserId = () =>{  
    if(this.authState !== null && this.authState !== undefined ) {
      localStorage.setItem('user',this.authState.user.uid);
      return localStorage.getItem('user');
    }
  }

  signup = (email: string, password: string, displayName: string) => {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.authState = user;
      const status = 'online';
      this.setUserData(email, displayName, status);
      this.router.navigate(['chat']);
    }).catch(error => console.log(error));
  }

  setUserData = (email, displayName, status) => {
    const path = `users/${this.currentUserId()}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    }
    this.db.object(path).update(data).catch(error=> console.log(error));
  }

  updateUserStatus = (status) => {
    const path = `users/${this.currentUserId()}`;
    const data = {
      status: status
    }
    // this.db.object(path).update(data).catch(error=> console.log(error));
  }

  login = (email: string, password: string) => {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((usr) => {
      this.authState = usr;
      const status = 'online';
      this.updateUserStatus(status);
      this.router.navigate(['chat']);
    })
    .catch(error => console.log(error));
  }

  logOut = ()=> {
    const status = 'offline';
    this.updateUserStatus(status);
    localStorage.removeItem('user');
    this.afAuth.auth.signOut();
    this.user = null;
    this.router.navigate(['login']);
  }

}
