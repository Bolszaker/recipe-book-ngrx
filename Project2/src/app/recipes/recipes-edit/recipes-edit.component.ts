import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;
  subscription: Subscription;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private store: Store<fromApp.AppState>        
              ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit(){
    
    if(this.editMode){
      this.store.dispatch(RecipesActions.updateRecipe(
        {
          index: this.id, 
          recipe: this.recipeForm.value
        }
        ))
    } else {
      this.store.dispatch(RecipesActions.addRecipe({recipe: this.recipeForm.value}));
    }
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngredient(){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(
          null, 
          Validators.required
          ),
        'amount': new UntypedFormControl(
          null,[
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  deleteAllIngredients(){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).clear();
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new UntypedFormArray([]);

    if(this.editMode){
      this.storeSub = this.store.select('recipes').pipe(map( recipeState =>{
        return recipeState.recipes.find((recipe, index) =>{
          return index === this.id;
        })
      }))
      .subscribe(recipe =>{
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new UntypedFormGroup({
                'name': new UntypedFormControl(ingredient.name, Validators.required),
                'amount': new UntypedFormControl(ingredient.amount, [
                  Validators.required, 
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      })
    }

    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'imagePath': new UntypedFormControl(recipeImagePath, Validators.required),
      'description': new UntypedFormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

}
