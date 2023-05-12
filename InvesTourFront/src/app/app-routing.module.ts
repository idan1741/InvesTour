import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { MainComponent } from 'src/components/main/main.component';
import { StocksListComponent } from 'src/components/stocks-list/stocksList.component';
import { MyWallComponent } from 'src/components/my-wall/myWall.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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