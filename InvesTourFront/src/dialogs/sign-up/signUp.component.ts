import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EnvironmentConfig } from 'src/environments/env-loader/fetch-env-provider';
import { EnvConfig } from 'src/environments/environment-config/config.interface';
import { addUser } from 'src/server-requests/users/users.actions';

@Component({
  selector: 'sign-up',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(
    @Inject(EnvironmentConfig) private envConfig: EnvConfig,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private store: Store
  ) { }

  ngOnInit(): void {
    console.log(`http://${this.envConfig.serverUrl}${this.envConfig.httpPort}`);
  }

  public hide1: boolean = true;
  public hide2: boolean = true;
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public password: string = "";
  public confirmPassword: string = "";
  public errorMessage: string = "";
  public disabled: boolean = false;

  public signUp() {
    if (this.password === this.confirmPassword) {
      this.store.dispatch(
        addUser({ firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password })
      );
      this.dialogRef.close();
    } else {
      alert("password must match confirmation")
    }
  }

  public checkPasswords(event) {
    console.log(event);
    if (this.password !== event.target.value) {
      this.errorMessage = "The passwords do not match";
      this.disabled = true;
    } else {
      this.errorMessage = "";
      this.disabled = false;
      this.confirmPassword = event.target.value;
    }
  }
}
