import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Stock } from "src/stock/stock.class";

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent implements OnInit {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);
  allNewByUserId$ = this.store.select(selectAllNewsByUser);
  stocks = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock]

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
  }

  constructor(private store: Store) {}
}
