import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SignInComponent } from 'src/dialogs/sign-in/signIn.component';
import { HomeComponent } from 'src/components/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { Store, createStore, applyMiddleware } from 'redux';
import { rootReducer, INITIAL_STATE } from './app-reducer';
import { createLogger } from 'redux-logger';
import { ArticleComponent } from 'src/components/article/article.component';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from 'src/server-requests/users/users.effects';
import { StoreModule } from '@ngrx/store';
import { usersReducer, usersReducerToken } from 'src/server-requests/users/users.reducer';
import { HttpClientModule } from '@angular/common/http';
import { NewsEffects } from 'src/server-requests/news/news.effects';
import { newsReducer, newsReducerToken } from 'src/server-requests/news/news.reducer';
import { MyProfileComponent } from 'src/components/my-profile/myProfile.component';
import { addStockDialogComponent } from 'src/dialogs/addStockDialog/addStockDialog.component';
import { StocksEffects } from 'src/server-requests/stocks/stocks.effects';
import { stocksReducer, stocksReducerToken } from 'src/server-requests/stocks/stocks.reducer';
import { MainComponent } from 'src/components/main/main.component';
import { SearchPipe } from 'src/utils/pipes/search.pipe';
import { TimeAgoPipe } from 'src/utils/pipes/time-ago.pipe';
import { MyWallComponent } from 'src/components/my-wall/myWall.component';
import { StockComponent } from 'src/components/stock/stock.component';
import { SignUpComponent } from 'src/dialogs/sign-up/signUp.component';
import { MatChipsModule } from '@angular/material/chips';


export const store: Store<any> = createStore(
  rootReducer,
  applyMiddleware(createLogger())
);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    MyWallComponent,
    ArticleComponent,
    StockComponent,
    MyProfileComponent,
    addStockDialogComponent,
    MainComponent,
    SearchPipe,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgReduxModule,
    HttpClientModule,
    MatDialogModule,
    MatChipsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(usersReducerToken, usersReducer),
    StoreModule.forFeature(newsReducerToken, newsReducer),
    StoreModule.forFeature(stocksReducerToken, stocksReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UsersEffects, NewsEffects, StocksEffects]),
  ],
  providers: [RequestConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<any>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
