import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { BasketService } from '../shopping-basket/basket.service';

// kada zelimo da ubacimo service unutar servica , moramo da ubacimo injectable, nakon toga , pravimo constructor u koji unosimo service
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Mojito',
      'Tasty refreshing mint cocktail',
      'https://www.maliburumdrinks.com/globalassets/images/cocktail-recipe-images/malibu-mojito.png/CocktailHero',
      [
        new Ingredient('Bacardi lemon', 2),
        new Ingredient('Brown sugar', 1),
        new Ingredient('Mint leaves', 6),
        new Ingredient('Club soda', 1)
      ]
    ),
    new Recipe(
      'Appletini',
      'Amazing apple martini',
      'https://typobar.ru/files/cocktails/2018-05-13-apple_martini.png',
      [
        new Ingredient('Stolichnaya vodka', 2),
        new Ingredient('Applepucker', 1),
        new Ingredient('Pineapple juice', 1),
        new Ingredient('Cherry', 3)
      ]
    )
  ];

  constructor(private basketService: BasketService) {}

  // dodajem metod koji cemo koristiti da postavimo recipes sa firebase-a
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice(); // na ovaj nacin dobijamo samo kopiju recipes
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToBasket(ingredients: Ingredient[]) {
    this.basketService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
