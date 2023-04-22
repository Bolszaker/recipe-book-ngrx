import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "src/shared/shared.module";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipesEditComponent,
        RecipeStartComponent       
    ],
    imports:[
        RouterModule, 
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})

export class RecipesModule {}