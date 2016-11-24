import { Component, Injectable } from '@angular/core';
import { TagList } from './taglist.service';
import { Observable } from 'rxjs/Observable';
import { ActiveUser } from '../common/activeuser.service';
import 'rxjs/add/observable/of';

@Injectable()
export class MockTagListService extends TagList {
    
    constructor(public activeUser : ActiveUser) {
      super(null,activeUser);
    }

    updateTagList(selectedOwnDrink, beverages, taglistValue){
        // not making sense to mock -> no result to test   
    }
    
    
  }