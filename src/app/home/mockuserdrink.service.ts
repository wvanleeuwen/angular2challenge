import { Component, Injectable } from '@angular/core';
import { UserDrink } from './userdrink.service';
import { Observable } from 'rxjs/Observable';
import { ActiveUser } from '../common/activeuser.service';
import { Beverage } from '../common/beverage';
import 'rxjs/add/observable/of';

@Injectable()
export class MockUserDrinkService extends UserDrink {
    
    constructor(public activeUser : ActiveUser) {
      super(null,activeUser);
    }

    getDrinksUser() {
        var result : Array<Beverage> = [];
        var drink1 = new Beverage(new Boolean(true), "7up");
        var drink2 = new Beverage(new Boolean(true), "Coca Cola");
        drink1.tagList = new Array()['taglistItem1_1', 'taglistItem1_2'];
        drink2.tagList = new Array()['taglistItem2_1', 'taglistItem2_2'];  
        result.push(drink1);
        result.push(drink2);
        return result;
    }
    
    addDistinctDrinkToOwnList(username, selectedDistinctDrink, drinkAgain, newBeverageName) {
        // not making sense to mock -> no result to test
    }
    
    deleteSelectedDrink(username, selectedOwnDrink) {
        // not making sense to mock -> no result to test
    }
  }