import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
// objects
import { User } from "../common/user";
// services
import { ActiveUser } from "../common/activeuser.service";
import { RenameService } from './rename.service';

const styles   = require('./rename.css');
const template = require('./rename.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [ styles ],
  providers: [RenameService]
})
export class Rename {
  
    private userName: String; 
    private currentUser : User;
  
  constructor(public router: Router, public activeUser : ActiveUser, public renameService:RenameService) {
     this.userName = this.activeUser.userName;
     if ( !this.userName ) {
          this.logout();
    }
    this.currentUser = activeUser.activeUser;
  }
  
  ngOnInit() {
      this.renameService.getCurrentUser();
  }

  updateCurrentUser(username, firstname, lastname){
      this.renameService.updateCurrentUser(username, firstname, lastname);
  }
  
//logout
  
  logout() {
      this.router.navigate( ['login'] );
  }
}