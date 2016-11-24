import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// objects
import { User } from "../common/user";
// services
import { ActiveUser } from "../common/activeuser.service";

@Injectable()
export class RenameService {
    
    responseText : String;

    constructor( public http: Http, public activeUser: ActiveUser ) { }

    getCurrentUser() {
        let url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + this.activeUser.userName;
        this.http.get( url )
            .subscribe(
            response => {
                var result = response.json();
                // convert data fields to user object
                let user = new User( result.firstName, result.lastName, result.userName );
            },
            error => {
                console.log( error.text() );
                this.responseText = "Error: '" + error.text();
            }
            );
    }

    updateCurrentUser( username, firstname, lastname ) {
        var beverages = new Array();
        var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + this.activeUser.userName
        var user = new User( firstname, lastname, username );
        let body = JSON.stringify( user );
        let headers = new Headers( { 'Content-Type': 'application/json' });
        console.log( body );
        this.http.put( url, body, { headers: headers })
            .subscribe(
            response => {
                this.responseText = "User '" + this.activeUser.userName + "' successfully updated!";
            },
            error => {
                console.log( error.text() );
                this.responseText = "Error: '" + error.text();
            }
            );
    }
}