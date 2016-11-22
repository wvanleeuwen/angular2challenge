import { Component, Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, Beverage } from "../login";

/**
 * responsible for the list of distinct drinks of all users
 */
@Injectable()
export class DistinctDrink {
  
  distinctDrinks : Array<String>;

  constructor(public http: Http) {
  };

  getDistinctDrinks() : Observable<Array<String>> {
    console.log("getDistinctDrinks");
    let url = "https://responsive-drinking-server.herokuapp.com/rest/distinctbeverages";
    return Observable.interval(5000)
    	.switchMap(() => this.http.get(url))
     	.map( (responseData) => {
      	        let response = responseData.json();
      	        let beverages = response;
      	        let result : Array<String> = [];
      	        beverages.forEach((beverage) => {
          			result.push(beverage);
    			})
    			this.distinctDrinks = result;
      			console.log(result);
      			return result;
    	});   
  }

  addDistinctDrinkToOwnList(username, selectedDistinctDrink, drinkAgain, newBeverageName) {
    if (selectedDistinctDrink != null || newBeverageName) {
      let selectedBeverage;
      if (selectedDistinctDrink != null) {
        selectedBeverage = new Beverage(drinkAgain, selectedDistinctDrink);
      }
      else {
        selectedBeverage = new Beverage(drinkAgain, newBeverageName);
      }

      var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages";
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url, JSON.stringify(selectedBeverage), { headers })
        .subscribe(response => {

          if (response.ok) {
            this.getDistinctDrinks();
          }
        },
        error => {
          alert(error.text());
        }
        );
    }
    else {
      alert("Please select a distinct drink first!");
    }
  }
}

