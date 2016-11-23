import { Component, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { ActiveUser } from '../common/activeuser.service';
import { LoginService } from './login.service';

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

  constructor(public router: Router, public route: ActivatedRoute, public http: Http, public activeUser : ActiveUser,
          public loginService : LoginService) { }

  ngOnInit() {
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
    this.activeUser.setActiveUser(username);
    this.router.navigate(['home']);
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}

@Injectable()
export class User {

  beverages: Array<Beverage>;

  constructor(public firstName: String, public lastName: String, public userName: String ) {
  }
}

@Injectable()
export class Beverage {

  tagList: Array<String>;

  constructor(public drinkAgain: Boolean, public name: String) {
  }
}

@Injectable()
export class BeverageCounter {

  constructor(public beverageName: String, public counter: number) {
  }
}