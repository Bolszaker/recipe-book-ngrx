import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth-actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;
  
  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(){
    this.userSub = this.store
      .select('auth')
      .pipe(map(appState => appState.user))
      .subscribe(user =>{
      this.isAuthenticated = user ? true : false;
    }); 
  }

  onSaveRecipes(){
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onFetchRecipes(){
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  onLogout(){
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}