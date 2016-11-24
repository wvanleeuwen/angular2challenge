import { Component, Injectable } from '@angular/core';
import { SignupService } from './signup.service';

@Injectable()
export class MockSignupService extends SignupService {
    
    constructor() {
      super(null);
    }

    signup(username, firstname, lastname) {
        this.responseText = "User created";
    }
    
  }