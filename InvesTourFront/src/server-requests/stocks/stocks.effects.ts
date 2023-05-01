import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap, withLatestFrom } from "rxjs/operators";
import { RequestConfigService } from "../requests.service";
import { Store } from "@ngrx/store";
import { getStocksByUser, getStocksByUserSuccess, toggleStock } from "./stocks.actions";
import { selectUsersEmail } from "../users/users.reducer";
import { Stock, selectUserStockList } from "./stocks.reducer";

@Injectable()
export class StocksEffects {
    stocksByUser = createEffect(() =>
        this.actions$.pipe(
            ofType(getStocksByUser),
            withLatestFrom(this.store.select(selectUsersEmail)),
            switchMap(([, userEmail]) => this.configService.getStockListByUser(userEmail).pipe(
                tap((res) => console.log(res)),
                tap(res => this.store.dispatch(getStocksByUserSuccess({ stockList: res as Stock[]})))
            ))
        ),
        { dispatch: false }
    )

    toggleStock = createEffect(() =>
        this.actions$.pipe(
            ofType(toggleStock),
            withLatestFrom(this.store.select(selectUserStockList), this.store.select(selectUsersEmail)),
            switchMap(([{stockSymbol}, usersStocks, userEmail]) => {
                const x = usersStocks.find(s => s.symbol === stockSymbol);
                return usersStocks.find(s => s.symbol === stockSymbol) ?
                    this.configService.removeStockFromUserList(userEmail, stockSymbol).pipe(tap(() => this.store.dispatch(getStocksByUser()))) :
                    this.configService.addStockToUserList(userEmail, stockSymbol).pipe(tap(() => this.store.dispatch(getStocksByUser())))
            })
        ),
        { dispatch: false }
    )

    constructor(
        private readonly actions$: Actions, 
        private configService: RequestConfigService, 
        private store: Store
    ){}
}