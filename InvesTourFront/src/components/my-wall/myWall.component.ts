import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { getArticlesByUser } from 'src/server-requests/news/news.actions';
import { selectAllNewsByUser } from 'src/server-requests/news/news.reducer';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { getStocksByUser } from 'src/server-requests/stocks/stocks.actions';
import { selectUserStockList } from 'src/server-requests/stocks/stocks.reducer';
import { selectUsersState } from 'src/server-requests/users/users.reducer';

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css'],
})
export class MyWallComponent implements OnInit {
  public allNewByUserId$ = this.store.select(selectAllNewsByUser);
  public userStocklList$ = this.store.select(selectUserStockList);
  public user$ = this.store.select(selectUsersState);
  public userTweets$;
  public userPosts$;
  public userTweets;

  combined$ = forkJoin([
    this.configService.getTweetsByUserId("idoozeri@gmail.com"), 
    this.configService.getPostsByUserId("idoozeri@gmail.com")
  ]).pipe(
    map(([tweets, posts]) => (tweets as any[]).concat(posts).sort(
        (a, b) =>
          new Date(b.time | b.date).getTime() -
          new Date(a.time | b.date).getTime()
      )
  ));

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
    this.store.dispatch(getStocksByUser());
    this.userTweets$ =
      this.configService.getTweetsByUserId('idoozeri@gmail.com');
    this.userPosts$ = this.configService.getPostsByUserId('idoozeri@gmail.com');
  }

  constructor(
    private store: Store,
    private configService: RequestConfigService
  ) {}
}
