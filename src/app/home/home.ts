import { Component, Input, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Beverage } from "../login";

const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [styles]
})
export class Home {

  private userName : String;
  private activeUser : User;
  private beverages : Array<Beverage>;
  private distinctBeverages : Array<String>;
  private selectedDistinctDrink : String;
  private selectedOwnDrink : String;
  private selectedOwnBeverage : Array<Beverage>;
  private tagList : Array<String>;
  private taglistString : String;
  private newBeverageName : String;

  constructor(public router: Router, public route: ActivatedRoute, public http: Http) {
    route.params.subscribe(params => {
    this.userName = params['username'];     
    });
    this.selectedDistinctDrink = null;
    this.selectedDistinctDrink = null;
    this.selectedOwnDrink = null;
    this.selectedOwnBeverage = null;
    this.newBeverageName = null;
  }

  ngOnInit() {
    this.getDrinksUser();
    this.getDistinctDrinks();
  }

  getDrinksUser(){
    let url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+this.userName;
    this.http.get(url)
      .subscribe(
      response => {       
        var result = response.json();
        // convert data fields to user object
        let user = new User(result.firstName, result.lastName, result.userName);
        this.activeUser = user;   
        this.beverages = new Array();
        var length = Object.keys(result.beverages).length;
        for (var i = 0; i < length; i++) {
          var beverage = result.beverages[i];
          // convert data fields to beverage object
          var drink = new Beverage(beverage.drinkAgain, beverage.name);
          drink.tagList = beverage.tagList;
          this.beverages[i] = drink;
        }
      },
      error => {
        console.log(error);
        this.router.navigate(['login']);
      }
      );
  }
  
  getDistinctDrinks(){
    console.log("getDistinctDrinks");
    let url = "https://responsive-drinking-server.herokuapp.com/rest/distinctbeverages";
    this.http.get(url)
      .subscribe(
      response => {       
        var result = response.json();
        this.distinctBeverages = new Array();
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
          this.distinctBeverages[i] = result[i];
        }
      },
      error => {
        alert(error.text());
      }
      );
  }
  
  addDistinctDrinkToOwnList(username, drinkAgain, newBeverageName){
    console.log("addDistinctDrinkToOwnList");
    this.userName = username;
    if(this.selectedDistinctDrink != null || newBeverageName){
      let selectedBeverage;
      if(this.selectedDistinctDrink != null){
        selectedBeverage = new Beverage(drinkAgain, this.selectedDistinctDrink);
      }
      else {
        selectedBeverage = new Beverage(drinkAgain, newBeverageName);
      }
      
      var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username+"/beverages";
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url, JSON.stringify(selectedBeverage), { headers })
        .subscribe(response => {     
          
        if(response.ok){ 
          this.getDrinksUser(); 
          this.newBeverageName = null;
        }
      },
      error => {
        alert(error.text());
      }
      );
    }
    else {
      alert("Please select a distinct drink first!");
    }
  }
    
  deleteSelectedDrink(username){
    console.log("deleteSelectedDrink");
      this.userName = username;
      var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username+"/beverages/"+this.selectedOwnDrink;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.delete(url, { headers })
        .subscribe(response => {     
          
        if(response.ok){ 
          this.selectedOwnDrink = null;        
          this.getDrinksUser(); 
        }
      },
      error => {
        alert(error.text());
      }
      );
    }
  
  getTagListDrink(beverage){
    for(var i = 0; i < this.beverages.length; i++){
      console.log(this.beverages[i].name)
      if(beverage === this.beverages[i].name){
        this.tagList = this.beverages[i].tagList;
        this.setTagListString();
        return;
      }
    }
  }
  
  updateTagList(username, taglistValue){
    
      var tagListObj = this.setTagListObject(taglistValue);
      console.log("updateTageList");        
      this.userName = username;
      for(var i = 0; i < this.beverages.length; i++){
          console.log(this.beverages[i].name)
          if(this.selectedOwnDrink === this.beverages[i].name){
            var drinkAgain = this.beverages[i].drinkAgain;
            break;
          }
        }
      var updatedBeverage = new Beverage(drinkAgain, this.selectedOwnDrink);
      updatedBeverage.tagList = this.tagList;
      var url = "https://responsive-drinking-server.herokuapp.com/rest/users/"+username+"/beverages/"+this.selectedOwnDrink;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(JSON.stringify(updatedBeverage));
      this.http.put(url, JSON.stringify(updatedBeverage), { headers })
        .subscribe(response => {     
          
        if(response.ok){      
          this.getDrinksUser(); 
        }
      },
      error => {
        alert(error.text());
      }
      );
  }
  
  setTagListObject(taglistString){
    var str_array = taglistString.split(',');
    this.tagList = str_array;
  }
  
  setTagListString(){
    var tagListString = "";
    for(var i = 0; i < this.tagList.length; i++){
      console.log(this.tagList[i]);
      tagListString += this.tagList[i];
      if((i+1)<this.tagList.length){
        tagListString+=",";
      }
    }
    console.log("tagListString: "+tagListString);
    this.taglistString = tagListString;
  }
  
  setSelectedDistinctDrink(beverageName){
    this.selectedDistinctDrink = beverageName;
    this.newBeverageName = null;
  }
  
  newDrinkInsert(){
    this.selectedDistinctDrink = null;
  }
  
  setSelectedOwnDrink(beverageName){ 
    this.selectedOwnDrink = beverageName;
    this.getTagListDrink(this.selectedOwnDrink);
  }

  resetTagList(){
  }

  logout() {
    this.router.navigate(['login']);
  }
}