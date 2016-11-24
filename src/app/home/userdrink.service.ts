import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
//objects
import { User } from "../common/user";
import { Beverage } from "../common/beverage";
import { ActiveUser } from "../common/activeuser.service";

@Injectable()
export class UserDrink {
    
    //public beverages : Array<Beverage>;

    public _beverages : BehaviorSubject<Array<Beverage>> = new BehaviorSubject<any>(null);
    public beveragesObservable : Observable<Array<Beverage>> = this._beverages.asObservable();
    public beverages : Array<Beverage>;
    
    constructor(public http : Http, public activeUser : ActiveUser){}
    
    getDrinksUser() {

        console.log("getDrinksUser");
        let url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + this.activeUser.userName;
        this.http.get(url)
          .map( (responseData) => {
                    let response = responseData.json();
                    let user = new User(response.firstName, response.lastName, response.userName);
                    this.activeUser.setActiveUserObj(user);
                    let beverages = response.beverages;
                    let result : Array<Beverage> = [];
                    beverages.forEach((beverage) => {
                      var drink = new Beverage(beverage.drinkAgain, beverage.name);
                      drink.tagList = beverage.tagList;
                      result.push(drink);
                    })
                this.beverages = result;
                console.log(result);
                return result;
          }).subscribe((change) => {
              this._beverages.next(change);
          });   
      }
    
    addDistinctDrinkToOwnList(username, selectedDistinctDrink, drinkAgain, newBeverageName) {
        
        if(selectedDistinctDrink != null || newBeverageName) {
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
              }
            },
            error => {
              console.log(error.text());
            }
            );
        }
        else {
          alert("Please select a distinct drink first!");
        }
      }
        
      deleteSelectedDrink(username, selectedOwnDrink) {
        var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages/" + selectedOwnDrink;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.delete(url, { headers })
          .subscribe(response => {

            if (response.ok) {
              this.getDrinksUser();
            }
          },
          error => {
            console.log(error.text());
          }
          );
      }
}