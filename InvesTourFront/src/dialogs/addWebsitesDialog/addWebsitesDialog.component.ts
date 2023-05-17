import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { getAvailableWebsites } from 'src/server-requests/news/news.actions';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { toggleStock } from 'src/server-requests/stocks/stocks.actions';
import { selectUserStockList } from 'src/server-requests/stocks/stocks.reducer';
import { selectUsersState } from 'src/server-requests/users/users.reducer';

@Component({
  selector: 'addWebsitesDialog',
  templateUrl: './addWebsitesDialog.component.html',
  styleUrls: ['./addWebsitesDialog.component.css'],
})
export class AddWebsitesDialogComponent implements OnInit {
  searchText: string;

  websites$ = this.configService.getAvailableWebsites();
  public user$ = this.store.select(selectUsersState);
  public websitesByUser$;

  constructor(
    private store: Store,
    private configService: RequestConfigService,
    public dialogRef: MatDialogRef<AddWebsitesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(getStocksByUser());
    this.user$.subscribe(user => this.websitesByUser$ = this.configService.getWebsitesByUser(user.email));
  }

  isWebsiteInUserList(stockSymbol: string): boolean {
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

  toggleWebsite(website) {
    // this.store.dispatch(
    //   toggleStock({
    //     stockSymbol,
    //     stockId,
    //   })
    // );
  }
}
