import { Component, Injectable} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User, Beverage } from "../login";

/**
 * responsible for the tag list of selected drink of current user
 */
@Injectable()
export class TagListDrink {

  tagList: Array<String>; 

  constructor(public http: Http) { };

  getTagListDrink(beverage, beveragesList): Array<String> {
  	console.log("getTagListDrink");
    this.tagList = new Array<String>();
    for (var i = 0; i < beveragesList.length; i++) {
      console.log(beveragesList[i].name)
      if (beverage === beveragesList[i].name) {
        this.tagList = beveragesList[i].tagList;
        this.setTagListString();
        break;
      }
    }
    console.log(this.tagList);
    return this.tagList;
  }

  setTagListObject(taglistString) {
    var str_array = taglistString.split(',');
    this.tagList = str_array;
  }

  setTagListString(): String {
    var tagListString = "";
    for (var i = 0; i < this.tagList.length; i++) {
      console.log(this.tagList[i]);
      tagListString += this.tagList[i];
      if ((i + 1) < this.tagList.length) {
        tagListString += ",";
      }
    }
    console.log("tagListString: " + tagListString);
    return tagListString;
  }

  updateTagList(username, taglistValue, beverages, selectedOwnDrink) {

    var tagListObj = this.setTagListObject(taglistValue);
    console.log("updateTageList");
    for (var i = 0; i < beverages.length; i++) {
      console.log(beverages[i].name)
      if (selectedOwnDrink === beverages[i].name) {
        var drinkAgain = beverages[i].drinkAgain;
        break;
      }
    }
    var updatedBeverage = new Beverage(drinkAgain, selectedOwnDrink);
    updatedBeverage.tagList = this.tagList;
    var url = "https://responsive-drinking-server.herokuapp.com/rest/users/" + username + "/beverages/" + selectedOwnDrink;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(JSON.stringify(updatedBeverage));
    this.http.put(url, JSON.stringify(updatedBeverage), { headers })
      .subscribe(response => {
      },
      error => {
        alert(error.text());
      }
      );
  }
}