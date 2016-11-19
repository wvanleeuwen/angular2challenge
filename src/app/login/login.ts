import { Component, Injectable, Inject  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class Login {

  users: Array<User>;
  selectedUser: User;
  beverages : Array<Beverage>;

  constructor(public router: Router, public route: ActivatedRoute, public http: Http) {}

  ngOnInit() {
    this.userList();
  }

  userList() {
    let body = JSON.stringify({});
    this.http.get('https://responsive-drinking-server.herokuapp.com/rest/users/')
      .subscribe(
      response => {
        var result = response.json();
        var length = Object.keys(result).length;
        this.users = new Array();
        for (var i = 0; i < length; i++) {
          var object = result[i];
          // convert data fields to user object
          let user = new User(object.firstName, object.lastName, object.userName);
          this.users[i] = user;
        }

        this.router.navigate(['login']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }
  
  setSelectedUser(username){
    this.selectedUser = username;
  }

  loginAction(username) {
    this.router.navigate(['home', username]);
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}

@Injectable()
export class User {
  
  beverages : Array<Beverage>;
  
  constructor(public firstName: String, public lastName: String, public userName: String) {
  }
}

@Injectable()
export class Beverage {
  
  tagList : Array<String>;
  
  constructor(public drinkAgain: Boolean, public name: String) {
  }
}