import { Component, Inject, Input, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { RequestConfigService } from "src/server-requests/requests.service";
import { getStocksByUser, toggleStock } from "src/server-requests/stocks/stocks.actions";
import { selectUserStockList } from "src/server-requests/stocks/stocks.reducer";



@Component({
  selector: 'addStockDialog',
  templateUrl: './addStockDialog.component.html',
  styleUrls: ['./addStockDialog.component.css']
})
export class addStockDialogComponent implements OnInit {
  searchText: string;

  stockList$ = this.configService.getStocksList();
  userStocklList$ = this.store.select(selectUserStockList);

  constructor(
    private store: Store,
    private configService: RequestConfigService,
    public dialogRef: MatDialogRef<addStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getStocksByUser());
  }

  isStockInUserList(stockSymbol: string): boolean {
    let isStockInUserList: boolean;

    this.store.select(selectUserStockList).subscribe((userStocks) => {
      isStockInUserList = Boolean(userStocks.find(userStock => userStock.symbol === stockSymbol))
    });

    return isStockInUserList
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleStock(event){
    this.store.dispatch(toggleStock({stockSymbol: event.target.innerText}))
    
    // let stock = this.StockList.find(stock=> stock.symbol === event.target.innerText);

    // if(stock.isInUserFav) {
    //   this.StockList.find(stock=> stock.symbol === event.target.innerText).isInUserFav = false;

    //   this.store.dispatch(removeStockFromUserList(event.target.innerText))
    // } else {
    //   stock.isInUserFav = !stock.isInUserFav;
    //   this.userStocklList.push(stock);

    //   this.store.dispatch(addStockToUserList(event.target.innerText))
    // }
  }
}
