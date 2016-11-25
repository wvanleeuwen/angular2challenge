import { Component } from '@angular/core';
import { ActiveUser } from "../common/activeuser.service";
import { User } from "../common/user";
import { Rename } from './'
import { MockRenameService } from './mockrename.service';

describe('Rename unit test', () => {
    var rename: Rename,
    activeUserService: ActiveUser,
    renameServiceMock : MockRenameService;

    beforeEach(() => {
        activeUserService = new ActiveUser();
        activeUserService.setActiveUserObj(new User("Test","User","userTest"))
        renameServiceMock = new MockRenameService(activeUserService);
        rename = new Rename(null, activeUserService, renameServiceMock);
    });
    
    it('shows username,firstname,lastnam of active user by default - unit', () => {
        
        expect(rename.activeUser).toBeDefined("no user in rename component = no user to rename");
        expect(rename.activeUser.lastName).toBe("User", "lastName not correct of current user");
        expect(rename.activeUser.firstName).toBe("Test", "firstName not correct of current user");
        expect(rename.activeUser.userName).toBe("userTest", "userName not correct of current user");
        
        rename.ngOnInit();
        expect(rename.renameService.responseText).toBe("Current user", "unexpected text in responseText attribute");
        rename.updateCurrentUser(activeUserService.userName, activeUserService.firstName, activeUserService.lastName);
        expect(rename.renameService.responseText).toBe("Update Current User", "unexpected text in responseText attribute");
 
    });
 
});

