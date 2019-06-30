import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;


  constructor(private basService: BasketService) { }

  ngOnInit() {
    this.ingredients = this.basService.getIngredients();
    this.subscription = this.basService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.basService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
