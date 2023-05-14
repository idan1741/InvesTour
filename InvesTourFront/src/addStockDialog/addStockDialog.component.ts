import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { toggleStock } from 'src/server-requests/stocks/stocks.actions';
import {
  Stock,
  selectUserStockList,
} from 'src/server-requests/stocks/stocks.reducer';

@Component({
  selector: 'addStockDialog',
  templateUrl: './addStockDialog.component.html',
  styleUrls: ['./addStockDialog.component.css'],
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
      isStockInUserList = Boolean(
        userStocks.find((userStock) => userStock.symbol === stockSymbol)
      );
    });

    return isStockInUserList;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleStock(stockSymbol, stockId) {
    this.store.dispatch(
      toggleStock({
        stockSymbol,
        stockId,
      })
    );
  }
}
