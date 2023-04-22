import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth-effects';
import { RecipeEffects } from './recipes/store/recipe.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,  
    HttpClientModule, 
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    AppRoutingModule, 
    SharedModule,
    BrowserAnimationsModule   
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS, 
        useClass: AuthInterceptorService, 
        multi: true
      }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
