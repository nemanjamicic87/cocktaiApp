import { Component, OnInit,  ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-edit',
  templateUrl: './basket-edit.component.html',
  styleUrls: ['./basket-edit.component.css']
})
export class BasketEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') basketListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editedItem: Ingredient;

  constructor(private basketSer: BasketService) { }

  ngOnInit() {
    this.subscription = this.basketSer.startedEditing
      .subscribe(
        (index: number) => {
          this.editingItemIndex = index;
          this.editMode = true;
          this.editedItem = this.basketSer.getIngredient(index);
          this.basketListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.basketSer.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.basketSer.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.basketListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.basketSer.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
