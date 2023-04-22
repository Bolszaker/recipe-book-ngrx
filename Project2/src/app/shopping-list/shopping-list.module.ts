import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "src/shared/shared.module";

@NgModule({
    declarations:[    
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        RouterModule, 
        FormsModule, 
        ShoppingListRoutingModule,
        SharedModule
    ]
})

export class ShoppingListModule {}