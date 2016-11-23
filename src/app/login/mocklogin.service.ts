import { Component, Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MockLoginService extends LoginService {
    
    constructor() {
      super(null);
    }

    userList() {
      console.log('sending fake answers!');
      return Observable.of([
        {
            userName: 'wendy',
            firstName: 'Wendy',
            lastName: 'van Leeuwen',
            beverages: []
          }
        ]);
      }
  }