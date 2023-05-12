import { createAction, props } from "@ngrx/store";
import { Stock } from "./stocks.reducer";

export enum StocksActions {
    GET_STOCKS_BY_USER = '[Stocks] get stocks by user',
    GET_STOCKS_BY_USER_SUCCESS = '[Stocks] get stocks by user success',
    TOGGLE_STOCK_STATUS = '[Stocks] toggle stock status'
}

export const getStocksByUser = createAction(StocksActions.GET_STOCKS_BY_USER);

export const getStocksByUserSuccess = createAction(
    StocksActions.GET_STOCKS_BY_USER_SUCCESS,
    props<{ stockList: Stock[]}>()
);

export const toggleStock = createAction(
    StocksActions.TOGGLE_STOCK_STATUS,
    props<{ stockSymbol: string}>()
)
