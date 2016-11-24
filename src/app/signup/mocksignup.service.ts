import { Component, Injectable } from '@angular/core';
import { SignupService } from './signup.service';
import { Observable } from 'rxjs/Observable';
import { ActiveUser } from '../common/activeuser.service';
import 'rxjs/add/observable/of';

@Injectable()
export class MockSignupService extends SignupService {
    
    constructor() {
      super(null);
    }

    signup(username, firstname, lastname) {
        this.responseText = "User created";
    }
    
  }