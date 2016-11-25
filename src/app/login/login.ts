import { Component } from '@angular/core';
import { Router } from '@angular/router';
// services
import { ActiveUser } from '../common/activeuser.service';
import { LoginService } from './login.service';
// commons
import { User } from '../common/user';
import { Beverage } from '../common/beverage';
import { BeverageCounter } from '../common/beveragecounter';

const styles = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [styles],
  providers : [LoginService]
})
export class Login {

  users: Array<User>;
  selectedUser: User;
  beverages: Array<Beverage>;
  beveragesSorted: Array<BeverageCounter>;
  userListSubscription : any;

  constructor(public router: Router, public activeUser : ActiveUser,
          public loginService : LoginService) { }

  ngOnInit() {
      // call it
      this.loginService.userList();
    // subscribe
    this.userListSubscription = this.loginService.userList().subscribe(
      users => this.users = users,
      );
  }
  
  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }

  setSelectedUser(username) {
    this.selectedUser = username;
  }

  loginAction(username) {
    this.activeUser.setUserName(username);
    this.router.navigate(['home']);
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
