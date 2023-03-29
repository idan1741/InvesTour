import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { getArticlesByUserSuccess } from "./news.actions";

export const newsReducerToken = 'news';

export interface Article {
    // company: string;
    // text: string;
    // extendedText: string;
    // time: string;
    description: string;
    imageUrl: string;
    newUrl: string;
    publishedAt: string;
    title: string;
}

export interface NewsState {
    newsByUser: Article[]
}

export const initialState: NewsState = {
    newsByUser: []
}

const reducer = createReducer(
    initialState,
    on(getArticlesByUserSuccess, (state, {articles}) => ({ ...state, newsByUser: articles}))
)

export function newsReducer(state: NewsState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectNewsState = createFeatureSelector<NewsState>(newsReducerToken);

export const selectAllNewsByUser = createSelector(
    selectNewsState, 
    (state: NewsState) => state.newsByUser
)
