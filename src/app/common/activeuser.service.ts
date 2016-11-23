import { Component, Injectable } from '@angular/core';

@Injectable()
export class ActiveUser {
    
    public userName : String;

    constructor(){
        console.log("ActiveUser created");
    }

    setActiveUser(username){
        console.log("setActiveUser called: "+username);
        this.userName = username;
    }
    
    getActiveUserName(){
        console.log("getActiveUser called: "+this.userName);
        return this.userName;
    }
}