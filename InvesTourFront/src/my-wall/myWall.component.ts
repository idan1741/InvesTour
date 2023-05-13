import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { getStocksByUser } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent implements OnInit {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  allNewByUserId$ = this.store.select(selectAllNewsByUser);
  userStocklList$ = this.store.select(selectUserStockList);

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
    this.store.dispatch(getStocksByUser());
  }

  constructor(private store: Store, private http: HttpClient, private configService: RequestConfigService) {}
}
