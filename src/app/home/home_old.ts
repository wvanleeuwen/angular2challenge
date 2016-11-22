import { Component, Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User, Beverage } from "../login";

const styles = require('./home.css');
const template = require('./home.html');

/**
 * Main responsible for home page
 */
@Component({
  selector: 'home',
  template: template,
  styles: [styles]
})
export class Home {

  private sub : any;
  private userName: String;
  private beverages: Array<Beverage>;
  private distinctBeverages: Array<String>;
  private selectedDistinctDrink: String;
  private selectedOwnDrink: String;
  private tagList: Array<String>;
  private newBeverageName: String;
  private tagListDrink: TagListDrink;
  private activeUser : User;
  private userDrinkSubscription : any;
  private distinctDrinkSubscription : any;

  constructor(public router: Router, public route: ActivatedRoute, public http: Http, 
   public userDrink: UserDrink, public distinctDrink: DistinctDrink) {
    
    route.params.subscribe(params => {
      this.userName = params['username'];
    });
    
    // input field attrs
    this.selectedDistinctDrink = null;
    this.selectedOwnDrink = null;
    this.newBeverageName = null;
    // subscriptions
    this.userDrinkSubscription = null;
    this.distinctDrinkSubscription = null;
  }

  ngOnInit() {
      this.getDrinksUser();
      this.getDistinctDrinks();
  }
  
  ngOnDestroy() {
    this.userDrinkSubscription.unsubscribe();
    this.distinctDrinkSubscription.unsubscribe();
  }

  // all drinks current user
  getDrinksUser() {
      this.userDrinkSubscription = this.userDrink.getDrinksUser(this.userName).subscribe(
      beverages => this.beverages = beverages);
  }

  // all distinct drink all users
  getDistinctDrinks() {
      this.distinctDrinkSubscription = this.distinctDrink.getDistinctDrinks().subscribe(
      distinctBeverages => this.distinctBeverages = distinctBeverages);
  }

  // adding distinct drink to list current user
  addDistinctDrinkToOwnList(username, drinkAgain, newBeverageName) {
    this.userName = username;
    this.distinctDrink.addDistinctDrinkToOwnList(username, this.selectedDistinctDrink, drinkAgain, newBeverageName);
    //this.getDrinksUser();
    this.newBeverageName = null;
  }

  // delete drink from current user 
  deleteSelectedDrink(username) {
    this.userName = username;
    this.userDrink.deleteSelectedDrink(username, this.selectedOwnDrink);
  }

  // tag list of selected drink of current user
  getTagListDrink(beverage) {
    console.log(beverage);
    this.tagList = this.tagListDrink.getTagListDrink(beverage, this.beverages);
  }

  // update tag list of selected drink of current user
  updateTagList(username, taglistValue) {
    this.userName = username;
    this.tagListDrink.updateTagList(username, taglistValue, this.beverages, this.selectedOwnDrink)
    //this.getDrinksUser();
  }

  // selected drink of distinct list of all users
  setSelectedDistinctDrink(beverageName) {
    this.selectedDistinctDrink = beverageName;
    this.newBeverageName = null;
  }

  // when new drink insert -> selected drink of distinct list of all users not active anymore
  newDrinkInsert() {
    this.selectedDistinctDrink = null;
  }

  // selected drink of drinks of current user
  setSelectedOwnDrink(beverageName) {
    console.log("setSelectedOwnDrink: "+beverageName);
    this.selectedOwnDrink = beverageName;
    this.getTagListDrink(this.selectedOwnDrink);
  }

  // get back to user list on main page
  logout() {
    this.router.navigate(['login']);
  }
}