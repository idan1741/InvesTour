import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { getStocksByUser } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent implements OnInit {
  public allNewByUserId$ = this.store.select(selectAllNewsByUser);
  public userStocklList$ = this.store.select(selectUserStockList);

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
    this.store.dispatch(getStocksByUser());
  }

  constructor(private store: Store) { }
}
