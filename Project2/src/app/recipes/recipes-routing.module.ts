import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const routes: Routes = [
    { path: '', canActivate:[AuthGuard], component: RecipesComponent, 
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipesEditComponent },
            { path: ':id', component: RecipesDetailComponent, resolve:[RecipesResolverService] },
            { path: ':id/edit', component: RecipesEditComponent, resolve:[RecipesResolverService] }
        ] 
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipesRoutingModule {}