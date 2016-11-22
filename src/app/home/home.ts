import { Component, Input, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
  private userDrinkSubscription : any;
  private distinctDrinkSubscription : any;

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
    this.userDrinkSubscription = this.getDrinksUser().subscribe(
      beverages => this.beverages = beverages);
    this.distinctDrinkSubscription = this.getDistinctDrinks().subscribe(
      distinctBeverages => this.distinctBeverages = distinctBeverages);
  }
  
  ngOnDestroy() {
    this.userDrinkSubscription.unsubscribe();
    this.distinctDrinkSubscription.unsubscribe();
  }

  getDrinksUser(): Observable<Array<Beverage>> {

    console.log("getDrinksUser");
    let url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + this.userName;
    return Observable.interval(5000)
      .switchMap(() => this.http.get(url))
      .map( (responseData) => {
                let response = responseData.json();
                let user = new User(response.firstName, response.lastName, response.userName);
                this.activeUser = user;
                let beverages = response.beverages;
                let result : Array<Beverage> = [];
                beverages.forEach((beverage) => {
                  var drink = new Beverage(beverage.drinkAgain, beverage.name);
                  drink.tagList = beverage.tagList;
                  result.push(drink);
          })
          this.beverages = result;
            console.log(result);
            return result;
      });   
  }
  
  getDistinctDrinks() : Observable<Array<String>> {
    console.log("getDistinctDrinks");
    let url = "https://responsive-drinking-server.herokuapp.com/rest/distinctbeverages";
    return Observable.interval(5000)
      .switchMap(() => this.http.get(url))
      .map( (responseData) => {
                let response = responseData.json();
                let beverages = response;
                let result : Array<String> = [];
                beverages.forEach((beverage) => {
                result.push(beverage);
          })
          this.distinctBeverages = result;
            console.log(result);
            return result;
      });   
  }
  
  addDistinctDrinkToOwnList(username, drinkAgain, newBeverageName) {
  
    if (this.selectedDistinctDrink != null || newBeverageName) {
      let selectedBeverage;
      if (this.selectedDistinctDrink != null) {
        selectedBeverage = new Beverage(drinkAgain, this.selectedDistinctDrink);
      }
      else {
        selectedBeverage = new Beverage(drinkAgain, newBeverageName);
      }

      var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages";
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url, JSON.stringify(selectedBeverage), { headers })
        .subscribe(response => {

          if (response.ok) {
            this.getDistinctDrinks();
            this.resetTagList();
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
    
  deleteSelectedDrink(username) {
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages/" + this.selectedOwnDrink;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.delete(url, { headers })
      .subscribe(response => {

        if (response.ok) {
          this.getDrinksUser();
          this.resetTagList();
        }
      },
      error => {
        alert(error.text());
      }
      );
  }
  
  getTagListDrink(beverage){
  
    console.log("getTagListDrink: "+beverage);
    for(var i = 0; i < this.beverages.length; i++){
      console.log(this.beverages[i].name)
      if(beverage === this.beverages[i].name){
        this.tagList = this.beverages[i].tagList;
        console.log(this.tagList);
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
    console.log("setTagListString");
    this.taglistString = "";
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
    this.taglistString = "";
  }

  logout() {
    this.router.navigate(['login']);
  }

}