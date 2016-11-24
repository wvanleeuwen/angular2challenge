import { Component } from '@angular/core';
import { ActiveUser } from "../common/activeuser.service";
import { Login } from './'
import { LoginService } from './login.service'
import { MockLoginService } from './mocklogin.service'

describe('Login unit test', () => {
    var login: Login,
    activeUserService: ActiveUser,
    loginServiceMock : MockLoginService;

    beforeEach(() => {
        activeUserService = new ActiveUser();
        loginServiceMock = new MockLoginService();
        login = new Login(null, null, null, activeUserService, loginServiceMock);
    });
    
    it('shows list of login users by default - unit', () => {
        login.ngOnInit();
        expect(login.beverages).toBeUndefined();
        expect(login.selectedUser).toBeUndefined();
        expect(login.activeUser).toBeDefined(activeUserService);
        expect(login.users.length).toBeGreaterThan(0, "no user in result = no user to select");
        login.ngOnDestroy();
    });
 
});

