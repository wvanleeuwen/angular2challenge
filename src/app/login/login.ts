import { Component, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(public router: Router, public route: ActivatedRoute, public http: Http) { }

  ngOnInit() {
    this.userList();
  }

  userList() {
    let body = JSON.stringify({});
    this.http.get('https://responsive-drinking-server.herokuapp.com/rest/users/')
      .subscribe(
      response => {
        var result = response.json();
        var length = Object.keys(result).length;
        this.users = new Array();
        this.beverages = new Array();
        for (var i = 0; i < length; i++) {
          var object = result[i];
          // convert data fields to user object
          let user = new User(object.firstName, object.lastName, object.userName);
          this.users[i] = user;

          // creating list beverages (drinkAgain=true) counting
          if (object.beverages) {
            var beverageslength = Object.keys(object.beverages).length;
            for (var counter = 0; counter < beverageslength; counter++) {
              var beverage = object.beverages[counter];
              // convert data fields to beverage object
              var drink = new Beverage(beverage.drinkAgain, beverage.name);
              if (drink.drinkAgain) {
                this.beverages.push(drink);
              }
            }
          }
        }
        this.createFiveMostFavouriteDrinksList();

        this.router.navigate(['login']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  createFiveMostFavouriteDrinksList() {
    
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