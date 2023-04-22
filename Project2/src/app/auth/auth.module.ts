import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/shared/shared.module";

import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports:[ 
        SharedModule, 
        FormsModule,
        RouterModule.forChild([{path: '', component: AuthComponent}])
    ]
})

export class AuthModule {}