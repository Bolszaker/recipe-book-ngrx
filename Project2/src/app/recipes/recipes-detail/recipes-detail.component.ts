import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  
  
  constructor( 
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map( params => { 
        return +params['id'];
      }),
      switchMap( id => { 
        this.id = id;
        return this.store.select('recipes')
      }),
      map( recipesState => {
        return recipesState.recipes.find((recipe, index) =>{
          return index === this.id;
        });
      })
    )
    .subscribe( recipe => {
      this.recipe = recipe
    });
  }

  sendIngredients(){
    this.store.dispatch(ShoppingListActions.addIngredients({ingredient: this.recipe.ingredients}));
    }

  onDeleteRecipe(){
    this.store.dispatch(RecipesActions.deleteRecipe({index: this.id}));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

  nextRecipe(){
    this.router.navigate(['/recipes/', this.id +1])
  }

  previousRecipe(){
    this.router.navigate(['/recipes/', this.id -1])
  }

}