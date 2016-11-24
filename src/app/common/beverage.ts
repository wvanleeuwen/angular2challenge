import { Component, Injectable } from '@angular/core';

@Injectable()
export class Beverage {

  tagList: Array<String>;

  constructor(public drinkAgain: Boolean, public name: String) {
  }
}
