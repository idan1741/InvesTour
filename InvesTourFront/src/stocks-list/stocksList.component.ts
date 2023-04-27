import { Component, Input} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { addStockDialogComponent } from "src/addStockDialog/addStockDialog.component";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Stock } from "src/stock/stock.class";


@Component({
  selector: 'stocksList',
  templateUrl: './stocksList.component.html',
  styleUrls: ['./stocksList.component.css']
})
export class StocksListComponent {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);
  StockList = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "svd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "adwafs", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "qwrfq", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "gshrtfg", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "afd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "3453ty", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock];

  constructor(private store: Store,
              public dialog: MatDialog){}

  addStock() {
      const dialogRef = this.dialog.open(addStockDialogComponent, {
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

}
