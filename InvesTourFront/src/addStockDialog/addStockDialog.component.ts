import { Component, Inject, Input} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { addStockToUserList, removeStockFromUserList } from "src/server-requests/news/news.actions";
import { selectStocksByUserList, selectStocksList } from "src/server-requests/news/news.reducer";
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

  userStocklList = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock];

  stockList$ = this.store.select(selectStocksList);
  userStocklList$ = this.store.select(selectStocksByUserList);


  filteredStockList = this.StockList;

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<addStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.StockList.map(stock => {
        this.userStocklList.find(userStock => userStock.symbol === stock.symbol) ? stock.isInUserFav = true: null;
        return stock;
      })
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  search(event){
    if(event.target.value == ""){
      this.filteredStockList = this.StockList;
    } else {
      this.filteredStockList = this.StockList.filter(stock => stock.symbol.includes(event.target.value));
    }
  }

  add(event){
    let stock = this.StockList.find(stock=> stock.symbol === event.target.innerText);
    if(stock.isInUserFav) {
      this.StockList.find(stock=> stock.symbol === event.target.innerText).isInUserFav = false;


      this.store.dispatch(removeStockFromUserList(event.target.innerText))
    } else {
      stock.isInUserFav = !stock.isInUserFav;
      this.userStocklList.push(stock);

      this.store.dispatch(addStockToUserList(event.target.innerText))
    }
  }
}
