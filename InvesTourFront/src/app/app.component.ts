import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from "@ngrx/store";
import { SignInComponent } from 'src/dialogs/sign-in/signIn.component';
import { SignUpComponent } from 'src/dialogs/sign-up/signUp.component';
import { selectUsersFirstName, selectUsersLastName } from 'src/server-requests/users/users.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public firstName$ = this.store.select(selectUsersFirstName);
  public lastName$ = this.store.select(selectUsersLastName);

  constructor(private store: Store, public dialog: MatDialog) { }

  public signIn() {
    const dialogRef = this.dialog.open(SignInComponent, {
      data: {},
      backdropClass: 'backdropBackground'
    });
  }

  public signUp() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      data: {},
      backdropClass: 'backdropBackground'
    });
  }
}
