import { Component, Injectable } from '@angular/core';
import { Beverage } from './beverage';

@Injectable()
export class User {

  beverages: Array<Beverage>;

  constructor(public firstName: String, public lastName: String, public userName: String ) {
  }
}