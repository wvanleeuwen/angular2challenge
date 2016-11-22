import { Component, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

const styles = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class Login {

  users: Array<User>;
  selectedUser: User;
  beverages: Array<Beverage>;
  beveragesSorted: Array<BeverageCounter>;
  userListSubscription : any;

  constructor(public router: Router, public route: ActivatedRoute, public http: Http) { }

  ngOnInit() {
    this.userListSubscription = this.userList().subscribe(
      users => this.users = users);
  }
  
  ngOnDestroy() {
    this.userListSubscription.unsubscribe();
  }

  userList() {
  	console.log("userList")
    let body = JSON.stringify({});
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/";
        return Observable.interval(5000)
    	.switchMap(() => this.http.get(url))
     	.map( (responseData) => {
      	        let response = responseData.json();
      	        let users = response;
      	        let result : Array<User> = [];
      	        this.beverages = new Array<Beverage>();
      	        users.forEach((user) => {
          			result.push(
             		   new User(user.firstName, user.lastName, user.userName));
             		let beverages = user.beverages;
             		//console.log(beverages);
      	        	beverages.forEach((beverage) => {
					let drink = new Beverage(beverage.drinkAgain, beverage.name);
					              if (drink.drinkAgain) {
					                this.beverages.push(drink);
					              }
	    				})
    			})
    			this.users = result;
      			//console.log(result);
      			this.createFiveMostFavouriteDrinksList();
      			return result;
    	});   
  }

  createFiveMostFavouriteDrinksList() {
    console.log("create FavouriteDrinksList");
    var counts = new Array();    
    for (let beverage of this.beverages) {
      if (counts[beverage.name.toString()]) {
        counts[beverage.name.toString()] += 1;
      } else {
        counts[beverage.name.toString()] = 1;
      }
    };
    var countArray = new Array<BeverageCounter>();
    for (let count in counts) {
      countArray.push(new BeverageCounter(count, counts[count]));
    }
    // sort array on count value descending 
    countArray = countArray.sort(function(a, b) {
      return b.counter - a.counter;
    });
    this.beveragesSorted = countArray;
    
  }

  setSelectedUser(username) {
    this.selectedUser = username;
  }

  loginAction(username) {
    this.router.navigate(['home', username]);
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}

@Injectable()
export class User {

  beverages: Array<Beverage>;

  constructor(public firstName: String, public lastName: String, public userName: String) {
  }
}

@Injectable()
export class Beverage {

  tagList: Array<String>;

  constructor(public drinkAgain: Boolean, public name: String) {
  }
}

@Injectable()
export class BeverageCounter {

  constructor(public beverageName: String, public counter: number) {
  }
}