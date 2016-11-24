import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from '../common/user';

@Injectable()
export class SignupService {
    
    responseText : String;
    
    constructor(public http : Http){}
    
    signup(username, firstname, lastname) {
        var beverages = new Array();
        var responseText = "";
        var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username
        var user = new User(firstname, lastname, username);
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        console.log(body);
        this.http.put(url, body, {headers: headers})
          .subscribe(
            response => {
                this.responseText = "User '"+ username +"' successfully created";
            },
            error => {
              console.log(error.text());
              this.responseText =  "Error: '"+ error.text();
            }
          );
      }
}