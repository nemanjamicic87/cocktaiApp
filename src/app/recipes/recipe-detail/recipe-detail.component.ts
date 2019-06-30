import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recept: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];  posto imamo
    // situaciju u kojoj ce se receopt prikazivati sa desne strane,
    // dok u isto vreme mi njega biramo sa leve, ovaj metod nije dobar
    // mi moramo da se subscribujemo, i da slusamo promene
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id']; // +ispred params-a dodajemo,
          // zato sto ce id da nam se vrati u formi stringa,
          // sa plusom ispred mi ga  castujemo u number
          this.recept = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToBasket() {
    this.recipeService.addIngredientsToBasket(this.recept.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
