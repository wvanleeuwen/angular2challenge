import { Component, Injectable } from '@angular/core';
import { Drink } from './drink.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MockDrinkService extends Drink {
    
    constructor() {
      super(null);
    }
    
    getDistinctDrinks() {
        console.log('sending fake answers!');
        return Observable.of([
            "7up",
            "Bier",
            "Coca Cola"
          ]);
        }
  }