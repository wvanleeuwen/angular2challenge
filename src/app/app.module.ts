// Import dependencies
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthGuard } from './common/auth.guard';
import { Router } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { App } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Declare the NgModule decorator
@NgModule({
  // Define the root component
  bootstrap: [App],
  // Define other components in our module
  declarations: [
    Home, Login, Signup, App
  ],
  // Define the services imported by our app
  imports: [
    HttpModule, BrowserModule, FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard, AUTH_PROVIDERS,
    [{provide: APP_BASE_HREF, useValue : '/' }]
  ]
})
export class AppModule {}