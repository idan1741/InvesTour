import { Component, Inject, Input} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Stock } from "src/stock/stock.class";


@Component({
  selector: 'addStockDialog',
  templateUrl: './addStockDialog.component.html',
  styleUrls: ['./addStockDialog.component.css']
})
export class addStockDialogComponent {

  StockList = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "svd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "adwafs", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "qwrfq", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "gshrtfg", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock,
  {symbol: "afd", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  {symbol: "3453ty", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock];

  filteredStockList = this.StockList;

  constructor(
    public dialogRef: MatDialogRef<addStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  search(event){
    this.filteredStockList = this.StockList.filter(stock => stock.symbol.includes(event.target.value));
  }

}
