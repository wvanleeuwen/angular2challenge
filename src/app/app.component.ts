import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

const template = require('./app.component.html');

@Component({
  selector: 'app-root',
  template: template,
  styleUrls: ['./app.component.css']
})

export class App {
}