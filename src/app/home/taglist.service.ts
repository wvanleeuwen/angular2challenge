import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//objects
import { User } from "../common/user";
import { Beverage } from "../common/beverage";
import { ActiveUser } from "../common/activeuser.service";

@Injectable()
export class TagList {
    
    public tagList : Array<String>;
    public taglistString : String;
    
    constructor(public http : Http, public activeUser : ActiveUser){
        
        this.taglistString = "";
    }
    
    updateTagList(selectedOwnDrink, beverages, taglistValue){
        
        var tagListObj = this.setTagListObject(taglistValue);
        console.log("updateTageList");        
        for(var i = 0; i < beverages.length; i++){
            console.log(beverages[i].name)
            if(selectedOwnDrink === beverages[i].name){
              var drinkAgain = beverages[i].drinkAgain;
              break;
            }
          }
        var updatedBeverage = new Beverage(drinkAgain, selectedOwnDrink);
        updatedBeverage.tagList = this.tagList;
        var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+this.activeUser.userName+"/beverages/"+selectedOwnDrink;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(JSON.stringify(updatedBeverage));
        this.http.put(url, JSON.stringify(updatedBeverage), { headers })
          .subscribe(response => {     
            
          if(response.ok){    
            this.taglistString = "";
          }
        },
        error => {
          alert(error.text());
        }
        );
    }
    
    getTagListDrink(beverages, beverage ) {

        console.log( "getTagListDrink: " + beverage );
        for ( var i = 0; i < beverages.length; i++ ) {
            console.log( beverages[i].name )
            if ( beverage === beverages[i].name ) {
                this.tagList = beverages[i].tagList;
                this.setTagListString();
                return;
            }
        }
    }
    
    setTagListObject(taglistString){
        if(taglistString)
        var str_array = taglistString.split(',');
        this.tagList = str_array;
      }
      
    setTagListString(){
        console.log("setTagListString");
        this.taglistString = "";
        var tagListString = "";
        for(var i = 0; i < this.tagList.length; i++){
          console.log(this.tagList[i]);
          tagListString += this.tagList[i];
          if((i+1) < this.tagList.length){
            tagListString+=",";
          }
        }
        console.log("tagListString: "+tagListString);
        this.taglistString = tagListString;
      }
    
    resetTagList(){
        this.taglistString = "";
        this.tagList = new Array();
    }
}