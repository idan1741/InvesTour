import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
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

  ngOnInit(): void {
    this.store.dispatch(getArticlesByUser());
  }

  constructor(private store: Store) {}
}
