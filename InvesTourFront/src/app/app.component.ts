import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from 'src/server-requests/users/users.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public firstName$ = this.store.select(selectUsersFirstName);
  public lastName$ = this.store.select(selectUsersLastName);

  constructor(private store: Store){}
}
