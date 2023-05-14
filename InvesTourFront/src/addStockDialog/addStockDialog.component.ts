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

  async toggleStock(event) {
    let stockId = await this.getStockId(event.target.innerText);

    this.store.dispatch(
      toggleStock({
        stockSymbol: event.target.innerText,
        stockId: stockId,
      })
    );
  }

  async getStockId(stockSign: string): Promise<number> {
    const stocks: Promise<Stock[]> = (await this.configService
      .getStocksList()
      .toPromise()) as Promise<Stock[]>;
    const foundStock = (await stocks).find(
      (userStock) => userStock.symbol === stockSign
    );
    if (foundStock) {
      return foundStock.id;
    } else {
      return -1;
    }
  }
}
