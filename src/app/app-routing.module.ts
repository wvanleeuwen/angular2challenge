import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { App } from './app.component';
import { AuthGuard } from './common/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '',       component: Login },
      { path: 'login',  component: Login },
      { path: 'signup', component: Signup },
      { path: 'home',   component: Home, canActivate: [AuthGuard] },
      { path: '**',     component: Login },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
