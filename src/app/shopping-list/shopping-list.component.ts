import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private sListService : ShoppingListService, private loggingService: LoggingService) {}

  ngOnInit() {
    this.loggingService.printLog('hello from shoppingListComponent ngOnInit');
    this.ingredients = this.sListService.getIngredients();
    this.igChangeSub = this.sListService.ingredientChanged
      .subscribe(
        (ingredients : Ingredient[]) => {
          this.ingredients = ingredients;
        })
  }
  onEditItem(index: number) {
    this.sListService.editing.next(index);
  }


  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }


}
