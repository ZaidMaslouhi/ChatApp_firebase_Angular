import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.User = null;

  constructor(private authServ:AuthService, private db: AngularFireDatabase) { }

  async ngOnInit() {
    if(localStorage.getItem('user') !== undefined){
      let id = localStorage.getItem('user');
      await this.db.object(`/users/${id}`).valueChanges()
      .pipe(take(1)).pipe(map(x=> x=x))
      .subscribe((res:any)=>{ this.user = res});
    }else{
      this.user = null;
    }
  }

  reLoad = () => this.ngOnInit();
  
  logout = () =>{
    this.authServ.logOut();
    this.user=null;
  }

}
