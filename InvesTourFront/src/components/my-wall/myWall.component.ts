import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { getStocksByUser } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";
import { selectUsersState } from "src/server-requests/users/users.reducer";

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent implements OnInit {
  public allNewByUserId$ = this.store.select(selectAllNewsByUser);
  public userStocklList$ = this.store.select(selectUserStockList);
  public user$ = this.store.select(selectUsersState);
  public userTweets$;
  public userTweets;

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
    this.store.dispatch(getStocksByUser());
  }

  constructor(private store: Store, private configService: RequestConfigService) {
    this.user$.subscribe(user => this.userTweets$ = this.configService.getTweetsByUserId(user.email));
    // this.userTweets$.subscribe(tweets => console.log("tweets:", tweets));
    this.userTweets$.subscribe(tweets => {
      console.log("hiiii");
      this.userTweets = tweets.map(tweet => {
        return { publishedAt: tweet[0], title: tweet[1], description: tweet[2], sub: tweet[2].substring(0, 30) + "..." }
      })
      return this.userTweets;
    });
  }
}
