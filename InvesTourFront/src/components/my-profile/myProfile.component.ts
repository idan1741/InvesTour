import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { addStockDialogComponent } from "src/dialogs/addStockDialog/addStockDialog.component";
import { getStocksByUser } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";
import { Stock } from "../stock/stock.class";

@Component({
  selector: 'myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.css']
})
export class MyProfileComponent implements OnInit {
  // UserStockList$ = this.store.select(selectUserStockList);


  UserStockList$ = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "svd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "adwafs", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "qwrfq", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "gshrtfg", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "afd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "3453ty", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock];

  constructor(private store: Store, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(getStocksByUser())
  }

  addStock() {
    const dialogRef = this.dialog.open(addStockDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggle() {
    this.router.navigateByUrl('/myWall');
  }

  remove(stock: Stock): void {
    const index = this.UserStockList$.indexOf(stock);

    if (index >= 0) {
      this.UserStockList$.splice(index, 1);
    }
  }
}
