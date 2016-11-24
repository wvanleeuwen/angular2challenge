import { Component, Injectable } from '@angular/core';
import { User } from '../common/user'

@Injectable()
export class ActiveUser {
    
    public userName : String;
    public firstName : String;
    public lastName : String;
    public activeUser : User;

    constructor(){
        console.log("ActiveUser created");
    }
    
    setUserName(username){
        this.userName = username;
    } 

    setFirstName(firstname){
        this.firstName = firstname;
    }   

    setLastName(lastname){
        this.lastName = lastname;
    }
    
    setActiveUserObj(user){
        this.activeUser = user;
        this.userName = this.activeUser.userName;
        this.firstName = this.activeUser.firstName;
        this.lastName = this.activeUser.lastName;
    }
}