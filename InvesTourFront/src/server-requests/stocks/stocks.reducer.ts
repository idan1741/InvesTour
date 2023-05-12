import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { getStocksByUserSuccess } from "./stocks.actions";

export const stocksReducerToken = 'stocks';

export interface Stock {
    id: number;
    name: string;
    symbol: string;
}

export interface StocksState {
    userStocks: Stock[]
}

export const initialState: StocksState = {
    userStocks: []
}

const reducer = createReducer(
    initialState,
    on(getStocksByUserSuccess, (state, {stockList}) => ({ ...state, userStocks: stockList})),
)

export function stocksReducer(state: StocksState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectStocksState = createFeatureSelector<StocksState>(stocksReducerToken);

export const selectUserStockList = createSelector(
    selectStocksState,
    (state: StocksState) => state.userStocks
)
