import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  getAvailableWebsites,
  removeWebsiteFromWatchList,
  addWebsiteToWatchList,
} from 'src/server-requests/news/news.actions';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { selectUsersState } from 'src/server-requests/users/users.reducer';

@Component({
  selector: 'addWebsitesDialog',
  templateUrl: './addWebsitesDialog.component.html',
  styleUrls: ['./addWebsitesDialog.component.css'],
})
export class AddWebsitesDialogComponent implements OnInit {
  searchText: string;

  public availableWebsites$: any = this.configService.getAvailableWebsites();
  public user$ = this.store.select(selectUsersState);
  public websitesByUser$;
  public user;

  constructor(
    private store: Store,
    private configService: RequestConfigService,
    public dialogRef: MatDialogRef<AddWebsitesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getStocksByUser());
    this.user$.subscribe((user) => {
      this.user = user;
      this.configService
        .getWebsitesByUser(user.email)
        .subscribe((userWebSite) => (this.websitesByUser$ = userWebSite));
    });
  }

  isWebsiteInUserList(websiteID: string): boolean {
    let isWebSiteInUserList: boolean;

    isWebSiteInUserList = Boolean(
      this.websitesByUser$.find((website: string) => website === websiteID)
    );
    return isWebSiteInUserList;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleWebsite(websiteId: string) {
    const isInUserLike = this.isWebsiteInUserList(websiteId);

    isInUserLike
      ? this.configService
          .removeWebsiteFromWatchList(this.user.email, websiteId)
          .subscribe((res) => console.log(res))
      : this.configService
          .addWebsiteToWatchList(this.user.email, websiteId)
          .subscribe((res) => console.log(res));

    this.configService
      .getWebsitesByUser(this.user.email)
      .subscribe((userWebSite) => (this.websitesByUser$ = userWebSite));
  }
}
