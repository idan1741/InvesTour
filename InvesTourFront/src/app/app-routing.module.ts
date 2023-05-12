import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { MainComponent } from 'src/components/main/main.component';
import { SignInComponent } from 'src/dialogs/sign-in/signIn.component';
import { StocksListComponent } from 'src/components/stocks-list/stocksList.component';
import { MyWallComponent } from 'src/components/my-wall/myWall.component';
import { SignUpComponent } from 'src/dialogs/sign-up/signUp.component';


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
