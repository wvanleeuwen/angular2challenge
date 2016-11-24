import { Component } from '@angular/core';
import { Signup } from './'
import { MockSignupService } from './mocksignup.service';

describe('Signup unit test', () => {
    var signup: Signup,
    signupServiceMock : MockSignupService;

    beforeEach(() => {
        signupServiceMock = new MockSignupService();
        signup = new Signup(null, null, signupServiceMock);
    });
    
    it('has empty attributes by default - unit', () => {
        
        expect(signup.lastname).toBe("", "lastName not empty before signing up?");
        expect(signup.firstname).toBe("", "firstName not empty before signing up?");
        expect(signup.username).toBe("", "userName not empty before signing up?");
        expect(signup.signupService.responseText).toBeUndefined("unexpected responsetext in responseText attribute before signing up");
        signup.signup("test", "test", "test");
        expect(signup.signupService.responseText).toBe("User created", "unexpected text in responseText attribute");
 
    });
 
});

