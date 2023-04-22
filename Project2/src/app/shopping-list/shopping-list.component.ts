import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Ingredient } from 'src/shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [    // add [@list1] to list element in html
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
      opacity: 0,
      transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ])
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

  }

  onEditItem(index: number){
    this.store.dispatch(ShoppingListActions.startEdit({index}));
  }
}
