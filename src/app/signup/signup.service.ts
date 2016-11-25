import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
// objects
import { contentHeaders } from '../common/headers';
import { User } from '../common/user';

@Injectable()
export class SignupService {
    
    responseText : String;
    
    constructor(public http : Http){}
    
    signup(username, firstname, lastname) {
        var beverages = new Array();
        var responseText = "";
        var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username;
        var user = new User(firstname, lastname, username);
        let body = JSON.stringify(user);
        let headers = contentHeaders;
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