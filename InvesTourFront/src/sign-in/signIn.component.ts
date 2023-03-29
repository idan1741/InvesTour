import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUser } from 'src/server-requests/users/users.actions';

@Component({
  selector: 'sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent {
  public hide: boolean = true;
  public email: string = "";
  public password: string = "";
  public username: string = "";

  constructor(private store: Store){}

  signIn(){
    // this.store.dispatch(loginUser({email: this.email, password: this.password}))
    this.store.dispatch(loginUser({email: this.username, password: this.password}))
  }
}
