import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User, Beverage } from "../login";
import { ActiveUser } from "../common/activeuser.service";

const styles   = require('./rename.css');
const template = require('./rename.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ]
})
export class Rename {
  
  private responseText : String;
  private userName: String; 
  private currentUser : User;
  
  constructor(public router: Router, public route: ActivatedRoute, public http: Http, public activeUser : ActiveUser) {
    this.userName = activeUser.getActiveUserName();   
  }
  
  ngOnInit() {
    this.getCurrentUser();
  }
  
  getCurrentUser(){
    let url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+this.userName;
    this.http.get(url)
      .subscribe(
      response => {       
        var result = response.json();
        // convert data fields to user object
        let user = new User(result.firstName, result.lastName, result.userName);
        this.currentUser = user; 
        this.getCurrentUser;
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  updateCurrentUser(event, username, firstname, lastname) {
    event.preventDefault();
    var beverages = new Array();
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username
    var user = new User(firstname, lastname, username);
    let body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(body);
    this.http.put(url, body, {headers: headers})
      .subscribe(
        response => {
          this.responseText = "User '"+ username +"' successfully updated!";
          this.currentUser = null;
          this.userName = username;
          this.getCurrentUser();
        },
        error => {
          console.log(error.text());
        }
      );
  }

}