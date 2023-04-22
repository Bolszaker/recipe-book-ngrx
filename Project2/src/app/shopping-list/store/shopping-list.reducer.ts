import { Action, createReducer, on } from "@ngrx/store";
import { Ingredient } from "src/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State {
    ingredients: Ingredient[];
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Potatoes', 10),
        new Ingredient('Tomatoes', 10),
      ],
    editedIngredientIndex: -1
}

const _shoppingListReducer = createReducer(

    initialState,

    on(
        ShoppingListActions.addIngredient,
        (state, action) => ({
          ...state,
          ingredients: state.ingredients.concat(action.ingredient)
        })
    ),

    on(
        ShoppingListActions.addIngredients,
        (state, action) => ({
            ...state,
            ingredients: state.ingredients.concat(...action.ingredient)
        })
    ),

    on(
        ShoppingListActions.updateIngredient,
        (state, action) => ({
            ...state,
            editedIngredientIndex: -1,
            ingredients: state.ingredients.map(
                (ingredient, index) => index === state.editedIngredientIndex ? {
                    ...action.ingredient } : ingredient
            )
        })
    ),
    
    on(
        ShoppingListActions.deleteIngredient,
        (state) => ({
            ...state,
            editedIngredientIndex: -1,
            ingredients: state.ingredients.filter(
                (_, index) => index !== state.editedIngredientIndex
            )
        })
    ),

    on(
        ShoppingListActions.startEdit,
        (state, action) => ({
            ...state,
            editedIngredientIndex: action.index
        })
    ),

    on(
        ShoppingListActions.stopEdit,
        (state) => ({
            ...state,
            editedIngredientIndex: -1
        })
    )
);

export function shoppingListReducer(state: State, action: Action) {
    return _shoppingListReducer(state, action);
  }
