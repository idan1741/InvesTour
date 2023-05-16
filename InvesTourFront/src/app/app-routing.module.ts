import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { MainComponent } from 'src/components/main/main.component';
import { MyProfileComponent } from 'src/components/my-profile/myProfile.component';
import { MyWallComponent } from 'src/components/my-wall/myWall.component';
import { StockPageComponent } from 'src/stock-page/stock-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'myWall', component: MyWallComponent },
  { path: 'main', component: MainComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'stockPage', component: StockPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }