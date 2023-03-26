import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppActions } from 'src/app/app-actions';

@Component({
  selector: 'sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent {
  public hide: boolean = true;
  public email: string = "";
  public password: string = "";

  constructor(private router: Router){}

  signIn(){
    alert("signIn");
    this.router.navigateByUrl('/myWall')
  }
}
