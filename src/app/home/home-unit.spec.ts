import { Component } from '@angular/core';
import { ActiveUser } from "../common/activeuser.service";
import { User } from "../common/user";
import { Home } from './'
import { MockDrinkService } from './mockdrink.service';
import { MockUserDrinkService } from './mockuserdrink.service';
import { MockTagListService } from './mocktaglist.service';
import { Beverage } from '../common/beverage';

describe('Home unit test', () => {
    var home: Home,
    activeUserService: ActiveUser,
    drinkServiceMock : MockDrinkService,
    userdrinkServiceMock : MockUserDrinkService,
    taglistServiceMock : MockTagListService;

    beforeEach(() => {
        activeUserService = new ActiveUser();
        activeUserService.setActiveUserObj(new User("Test","User","userTest"));
        drinkServiceMock = new MockDrinkService();
        userdrinkServiceMock = new MockUserDrinkService(activeUserService);
        taglistServiceMock = new MockTagListService(activeUserService);
        
        home = new Home(null, null, null, activeUserService, 
                drinkServiceMock, userdrinkServiceMock, taglistServiceMock);
    });
    
    it('shows username,firstname,lastname of active user by default - unit', () => {
        
        var result = new Array<Beverage>();
        var drink1 = new Beverage(new Boolean(true), "7up");
        var drink2 = new Beverage(new Boolean(true), "Coca Cola");
        var tagListArry1 = new Array<String>();
        tagListArry1.push("taglistItem1_1");    
        tagListArry1.push("taglistItem1_2");    
        
        var tagListArry2 = new Array<String>();
        tagListArry2.push("taglistItem2_1");    
        tagListArry2.push("taglistItem2_2");  
            
        drink1.tagList = tagListArry1;
        drink2.tagList = tagListArry2;
        console.log(drink1.tagList);
        console.log(drink2.tagList);
        result.push(drink1);
        result.push(drink2);
        console.log("result.length: "+ result.length);
        
        expect(home.activeUser).toBeDefined("no active user in rename process = no user for home");
        expect(home.activeUser.lastName).toBe("User", "lastName not correct of current user");
        expect(home.activeUser.firstName).toBe("Test", "firstName not correct of current user");
        expect(home.activeUser.userName).toBe("userTest", "userName not correct of current user");
        
        expect(home.taglistService).toBeDefined("taglistService should be defined");
        expect(home.distinctDrinkService).toBeDefined("distinctDrinkService should be defined");
        expect(home.userDrinkService).toBeDefined("userDrinkService should be defined");
        
        home.ngOnInit();
        expect(home.selectedDistinctDrink).toBeNull("selectedDistinctDrink should be null");
        expect(home.selectedOwnDrink).toBeNull("selectedOwnDrink should be null");
        expect(home.selectedOwnBeverage).toBeNull("selectedOwnBeverage should be null");
        
        home.userDrinkService.beverages = result;
        console.log("home.userDrinkService.beverages.length: "+ home.userDrinkService.beverages);
        
        home.setSelectedDistinctDrink("7up");
        expect(home.selectedDistinctDrink).toBe("7up", "selectedDistinctDrink not correctly set");
        home.newDrinkInsert();
        expect(home.selectedDistinctDrink).toBeNull("selectedDistinctDrink not correctly reset by inserting new drink");
        home.setSelectedOwnDrink("7up");
        expect(home.taglistService.taglistString).toBe("taglistItem1_1,taglistItem1_2", "not correct taglist as expected by selectedOwnDrink property");
        
        home.taglistService.getTagListDrink(result, "Coca Cola");
        expect(home.taglistService.taglistString).toBe("taglistItem2_1,taglistItem2_2", "not correct taglist as expected by selectedOwnDrink property");
        
        home.resetTagList();
        expect(home.taglistService.taglistString).toBe("", "not empty taglist aftyer resetting tag list");
        
    });
 
});

