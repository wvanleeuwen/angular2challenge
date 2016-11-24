import { Component, Input, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
// objects
import { User } from "../common/user";
import { Beverage } from "../common/beverage";
// services
import { ActiveUser } from "../common/activeuser.service";
import { Drink } from "./drink.service";
import { UserDrink } from "./userdrink.service";
import { TagList } from "./taglist.service";

const styles = require( './home.css' );
const template = require( './home.html' );

@Component( {
    selector: 'home',
    template: template,
    styles: [styles],
    providers: [[Drink], [UserDrink], [TagList]]
})
export class Home {

    // user
    private userName: String;
    // attrs
    private newBeverageName: String;
    // selections
    private selectedDistinctDrink: String;
    private selectedOwnDrink: String;
    private selectedOwnBeverage: Array<Beverage>;
    // subscriptions
    private userDrinkSubscription: any;
    private distinctDrinkSubscription: any;


    constructor( public router: Router, public route: ActivatedRoute, public http: Http, public activeUser: ActiveUser,
        public distinctDrinkService: Drink, public userDrinkService: UserDrink, public taglistService: TagList ) {

        this.userName = this.activeUser.userName;
        if ( !this.userName ) {
            this.logout();
        }

        // attrs
        this.selectedDistinctDrink = null;
        this.selectedDistinctDrink = null;
        this.selectedOwnDrink = null;
        this.selectedOwnBeverage = null;
        this.newBeverageName = null;
    }

    ngOnInit() {
        this.userDrinkSubscription = this.userDrinkService.getDrinksUser().subscribe(
            beverages => this.userDrinkService.beverages = beverages );
        this.distinctDrinkSubscription = this.distinctDrinkService.getDistinctDrinks().subscribe(
            distinctBeverages => this.distinctDrinkService.distinctBeverages = distinctBeverages );
    }

    ngOnDestroy() {
        this.userDrinkSubscription.unsubscribe();
        this.distinctDrinkSubscription.unsubscribe();
    }
    
// logout
    
    logout() {
        this.router.navigate( ['login'] );
    }
    
// reset methods
    
    resetTagList() {
        this.taglistService.resetTagList();
        this.userDrinkService.getDrinksUser();
    }

// set methods
    
    setSelectedDistinctDrink( beverageName ) {
        this.selectedDistinctDrink = beverageName;
        this.newBeverageName = null;
    }

    setSelectedOwnDrink( beverageName ) {
        this.selectedOwnDrink = beverageName;
        this.taglistService.getTagListDrink(this.userDrinkService.beverages, this.selectedOwnDrink);
    }
    
// CRUD methods    
    
    newDrinkInsert() {
        this.selectedDistinctDrink = null;
    }
    
    addDistinctDrinkToOwnList(username, drinkAgain, newBeverageName){
        this.userDrinkService.addDistinctDrinkToOwnList(username, this.selectedDistinctDrink, drinkAgain, newBeverageName);
        this.userDrinkService.getDrinksUser(); // how to force new get data with the observable
        this.resetTagList();
    }
    
    deleteSelectedDrink(username) {
        this.userDrinkService.deleteSelectedDrink(username, this.selectedOwnDrink);
        this.userDrinkService.getDrinksUser(); // how to force new get data with the observable
    }
    
    updateTagList(taglistValue){
        this.taglistService.updateTagList(this.selectedOwnDrink, this.userDrinkService.beverages, taglistValue);
        this.userDrinkService.getDrinksUser(); // how to force new get data with the observable
        this.resetTagList();
    }

}