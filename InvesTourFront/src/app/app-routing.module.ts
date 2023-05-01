import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/home/home.component';
import { MainComponent } from 'src/main/main.component';
import { MyWallComponent } from 'src/my-wall/myWall.component';
import { SignInComponent } from 'src/sign-in/signIn.component';
import { SignUpComponent } from 'src/sign-up/signUp.component';
import { StocksListComponent } from 'src/stocks-list/stocksList.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'myWall', component: MyWallComponent },
    { path: 'myWall/stockList', component: StocksListComponent },
    { path: 'main', component: MainComponent },
    { path: 'stockList', component: StocksListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
