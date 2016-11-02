import { Component } from '@angular/core';
import { Router } from '@angular/router';

const template = require('./app.component.html');

@Component({
  selector: 'app-root',
  template: template,
  styleUrls: ['./app.component.css']
})

export class App {
  constructor(router: Router) {}
}