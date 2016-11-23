import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { Home } from './home';
import { Login, User } from './login';
import { Signup } from './signup';
import { Rename } from './rename';
import { App } from './app.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',       component: Login },
      { path: 'login',  component: Login },
      { path: 'signup', component: Signup },
      { path: 'rename', component: Rename },
      { path: 'home', component: Home },
      { path: '**',     component: Login },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
