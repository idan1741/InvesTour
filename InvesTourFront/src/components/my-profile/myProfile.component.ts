import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { addStockDialogComponent } from "src/dialogs/addStockDialog/addStockDialog.component";
import { getStocksByUser, toggleStock } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { selectUserId, selectUsersState } from "src/server-requests/users/users.reducer";
import { AddWebsitesDialogComponent } from "src/dialogs/addWebsitesDialog/addWebsitesDialog.component";

@Component({
  selector: 'myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.css']
})
export class MyProfileComponent implements OnInit {
  public UserStockList$ = this.store.select(selectUserStockList);
  public user$ = this.store.select(selectUsersState);
  public userId$ = this.store.select(selectUserId);
  public websites$;

  constructor(private store: Store, public dialog: MatDialog, private configService: RequestConfigService) {
  }

  ngOnInit(): void {
    this.store.dispatch(getStocksByUser())
    this.user$.subscribe(user => this.websites$ = this.configService.getWebsitesByUser(user.email));
  }

  addStock() {
    const dialogRef = this.dialog.open(addStockDialogComponent, {
      data: {},
    });
  }

  addWebsite(){
    const dialogRef = this.dialog.open(AddWebsitesDialogComponent, {
      data: {},
    });
  }

  remove(stock: any): void {
    const stockSymbol = stock.symbol;
    const stockId = stock.id;
    this.store.dispatch(
      toggleStock({
        stockSymbol,
        stockId,
      })
    );
  }
}
