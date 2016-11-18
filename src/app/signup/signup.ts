import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User, Beverage } from "../login";

const styles   = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Signup {
  
  responseText : String;
  username: String; 
  firstname: String;
  lastname: String;
  
  constructor(public router: Router, public http: Http) {
    this.username="";
    this.firstname="";
    this.lastname="";
  }

  signup(event, username, firstname, lastname) {
    event.preventDefault();
    var beverages = new Array();
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username
    var user = new User(username, firstname, lastname);
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(body);
    this.http.put(url, body, {headers: headers})
      .subscribe(
        response => {
          this.responseText = "User '"+ username +"' successfully created";
          this.username="";
          this.firstname="";
          this.lastname="";
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}