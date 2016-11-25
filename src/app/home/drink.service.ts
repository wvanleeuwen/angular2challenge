import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//objects
import { Beverage } from "../common/beverage";

@Injectable()
export class Drink {
    
    public distinctBeverages : Array<String>;
    
    constructor(public http : Http){}
    
    
    getDistinctDrinks() : Observable<Array<String>> {
        console.log("getDistinctDrinks");
        let url = "https://responsive-drinking-server.herokuapp.com/rest/distinctbeverages";
        return Observable.timer(0, 10000)
          .switchMap(() => this.http.get(url))
          .map( (responseData) => {
                    let response = responseData.json();
                    let beverages = response;
                    let result : Array<String> = [];
                    beverages.forEach((beverage) => {
                    result.push(beverage);
              });
              this.distinctBeverages = result;
                console.log(result);
                return result;
          }).distinctUntilChanged(); 
      }
}