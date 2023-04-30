import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap, withLatestFrom } from "rxjs/operators";
import { RequestConfigService } from "../requests.service";
import { Store } from "@ngrx/store";
import { getStocksByUser, getStocksByUserSuccess } from "./stocks.actions";
import { selectUsersEmail } from "../users/users.reducer";
import { Stock } from "./stocks.reducer";

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

    constructor(
        private readonly actions$: Actions, 
        private configService: RequestConfigService, 
        private store: Store
    ){}
}