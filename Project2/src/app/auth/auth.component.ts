import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
 
import { AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth-actions';
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)',
        borderRadius: '0'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)',
        borderRadius: '0'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)',
        borderRadius: '0'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(600)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ])
  ]
})
export class AuthComponent implements OnInit, OnDestroy{
  constructor(private store: Store<fromApp.AppState>){}
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  state = 'normal';
  wildState = 'normal';

  onAnimate(){
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink(){
    this.wildState == 'normal' ? this.wildState = 'shrunken' : this.wildState = 'normal';
  }


  private closeSub: Subscription;
  private storeSub: Subscription;

  ngOnInit(){
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      }
    )
  }
 
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
 
  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
 
    const email = form.value.email;
    const password = form.value.password;
 
    let authObs: Observable<AuthResponseData>;
 
    if(this.isLoginMode){
      this.store.dispatch(AuthActions.loginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(AuthActions.signupStart({ email: email, password: password }));
    }
    
    form.reset();
  }

  onCloseError(){
    this.store.dispatch(AuthActions.clearError());
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
 