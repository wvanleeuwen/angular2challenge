import { Component, Injectable } from '@angular/core';
import { RenameService } from './rename.service';
import { ActiveUser } from '../common/activeuser.service';

@Injectable()
export class MockRenameService extends RenameService {
    
    constructor(public activeUser : ActiveUser) {
      super(null,activeUser);
    }

    getCurrentUser(){
        this.responseText = "Current user";
    }
    
    updateCurrentUser( username, firstname, lastname ) {
        this.responseText = "Update Current User";
    }
  }