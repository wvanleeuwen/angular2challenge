import { Component, Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, Beverage } from "../login";

/**
 * responsible for the list of drinks of current user
 */
@Injectable()
export class UserDrink {
  
  public beverages : Array<Beverage>;
  public activeUser : User;

  constructor(public http: Http) { 
  };

  getDrinksUser(username) : Observable<Array<Beverage>> {

    console.log("getDrinksUser");
    let url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username;
    return Observable.interval(5000)
    	.switchMap(() => this.http.get(url))
     	.map( (responseData) => {
      	        let response = responseData.json();
      	        let user = new User(response.firstName, response.lastName, response.userName);
      	        this.activeUser = user;
      	        let beverages = response.beverages;
      	        let result : Array<Beverage> = [];
      	        beverages.forEach((beverage) => {
          			result.push(
             			new Beverage(beverage.drinkAgain, beverage.name));
    			})
    			this.beverages = result;
      			console.log(result);
      			return result;
    	});   
  }

  deleteSelectedDrink(username, selectedOwnDrink) {
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages/" + selectedOwnDrink;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.delete(url, { headers })
      .subscribe(response => {

        if (response.ok) {
          this.getDrinksUser(username);
        }
      },
      error => {
        alert(error.text());
      }
      );
  }
}

