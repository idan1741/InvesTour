import { Component, Inject, OnInit } from '@angular/core';
import { EnvironmentConfig } from 'src/environments/env-loader/fetch-env-provider';
import { EnvConfig } from 'src/environments/environment-config/config.interface';

@Component({
  selector: 'sign-up',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(@Inject(EnvironmentConfig) private envConfig: EnvConfig) {}

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
  public disabled: boolean= false;

  public signUp(){
    alert("signUp")
  }

  public checkPasswords(event){
    console.log(event);
    if(this.password !== event.target.value) {
      this.errorMessage = "The passwords do not match";
      this.disabled = true;
    } else {
      this.errorMessage = "";
      this.disabled = false;
      this.confirmPassword = event.target.value;
    }
  }
}
