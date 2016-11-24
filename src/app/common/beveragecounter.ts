import { Component, Injectable, Inject } from '@angular/core';

@Injectable()
export class BeverageCounter {

  constructor(public beverageName: String, public counter: number) {
  }
}