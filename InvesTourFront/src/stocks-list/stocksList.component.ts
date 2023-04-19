import { Component, Input} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { addStockDialogComponent } from "src/addStockDialog/addStockDialog.component";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";


@Component({
  selector: 'stocksList',
  templateUrl: './stocksList.component.html',
  styleUrls: ['./stocksList.component.css']
})
export class StocksListComponent {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

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
