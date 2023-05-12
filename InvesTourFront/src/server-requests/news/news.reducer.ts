import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { getArticlesByUserSuccess } from "./news.actions";
import { state } from "@angular/animations";
import { Article } from "src/article/article.class";

export const newsReducerToken = 'news';

export interface NewsState {
    newsByUser: Article[],
    // stocksList: any[],
    // stocksListByUser: any[]
}

export const initialState: NewsState = {
    newsByUser: [],
    // stocksList: [],
    // stocksListByUser: []
}

const reducer = createReducer(
    initialState,
    on(getArticlesByUserSuccess, (state, {articles}) => ({ ...state, newsByUser: articles})),
    // on(getStocksListSuccess, (state, {stocks}) => ({ ...state, stocksList: stocks})),
    // on(getStocksByUserListSuccess, (state, {stocks}) => ({ ...state, stocksListByUser: stocks})),
)

export function newsReducer(state: NewsState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectNewsState = createFeatureSelector<NewsState>(newsReducerToken);

export const selectAllNewsByUser = createSelector(
    selectNewsState, 
    (state: NewsState) => state.newsByUser
)

// TODO: move to stocks
// export const selectStocksList = createSelector(
//     selectNewsState,
//     (state: NewsState) => state.stocksList
// )
// export const selectStocksByUserList = createSelector(
//     selectNewsState,
//     (state: NewsState) => state.stocksListByUser
// )
