import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {  
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      const index = stateData.editedIngredientIndex;
      if(index > -1){
        this.editMode = true;
        this.editedItem = stateData.ingredients[index];
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }else{
        this.editMode = false;
      }
    });
  }

  onSubmit(form: NgForm){
    const value = form.value
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.store.dispatch(ShoppingListActions.updateIngredient({ingredient}));
    }else{
      this.store.dispatch(ShoppingListActions.addIngredient({ingredient}));
    }
    this.editMode = false;
    form.resetForm();
  }

  onDelete(){
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }

  onClear(){
    this.slForm.resetForm();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

}
