import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loginUser } from 'src/server-requests/users/users.actions';
import { addStockDialogComponent } from '../addStockDialog/addStockDialog.component';

@Component({
  selector: 'sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent {
  public hide: boolean = true;
  public email: string = "";
  public password: string = "";

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  signIn() {
    this.store.dispatch(loginUser({ email: this.email, password: this.password }))
    this.dialogRef.close();
  }
}
