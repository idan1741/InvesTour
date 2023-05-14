import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RequestConfigService } from '../requests.service';
import { Store } from '@ngrx/store';
import {
  getStocksByUser,
  getStocksByUserSuccess,
  toggleStock,
} from './stocks.actions';
import { selectUsersEmail } from '../users/users.reducer';
import { Stock, selectUserStockList } from './stocks.reducer';

@Injectable()
export class StocksEffects {
  stocksByUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getStocksByUser),
        withLatestFrom(this.store.select(selectUsersEmail)),
        switchMap(([, userEmail]) =>
          this.configService.getStockListByUser(userEmail).pipe(
            tap((res) => console.log(res)),
            tap((res) =>
              this.store.dispatch(
                getStocksByUserSuccess({ stockList: res as Stock[] })
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  toggleStock = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleStock),
      withLatestFrom(
        this.store.select(selectUserStockList),
        this.store.select(selectUsersEmail)
      ),
      switchMap(([{ stockSymbol, stockId }, usersStocks, userEmail]) => {
        console.log('req', stockId);

        return usersStocks.find((s) => s.symbol === stockSymbol)
          ? this.configService.removeStockFromUserList(userEmail, stockId).pipe(
              tap((res) => console.log(res)),
              map(() => getStocksByUser())
            )
          : this.configService
              .addStockToUserList(userEmail, stockId)
              .pipe(map(() => getStocksByUser()));
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private configService: RequestConfigService,
    private store: Store
  ) {}
}
