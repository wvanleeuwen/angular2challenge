import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
//objects
import { User } from "../common/user";
import { Beverage } from "../common/beverage";
// services
import { SignupService } from './signup.service';

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ],
  providers: [SignupService]
})
export class Signup {
 
  username: String; 
  firstname: String;
  lastname: String;
  
  constructor(public router: Router, public http: Http, public signupService : SignupService) {
    this.username="";
    this.firstname="";
    this.lastname="";
  }

  signup(username, firstname, lastname) {
      this.signupService.signup(username, firstname, lastname);
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}