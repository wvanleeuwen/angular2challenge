import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//objects
import { User } from "../common/user";
import { Beverage } from "../common/beverage";
import { ActiveUser } from "../common/activeuser.service";

@Injectable()
export class UserDrink {
    
    public beverages : Array<Beverage>;
    
    constructor(public http : Http, public activeUser : ActiveUser){}
    
    getDrinksUser(): Observable <Array<Beverage>> {

        console.log("getDrinksUser");
        let url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + this.activeUser.userName;
        return Observable.timer(0, 10000)
          .switchMap(() => this.http.get(url))
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
          }).distinctUntilChanged();   
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
              alert(error.text());
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
            alert(error.text());
          }
          );
      }
}