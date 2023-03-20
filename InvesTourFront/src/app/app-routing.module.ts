import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/home/home.component';
import { MyWallComponent } from 'src/my-wall/myWall.component';
import { SignInComponent } from 'src/sign-in/signIn.component';
import { SignUpComponent } from 'src/sign-up/signUp.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'myWall', component: MyWallComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
