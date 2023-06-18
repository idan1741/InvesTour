import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { getArticlesByUserSuccess, getNewsByUserSuccess } from './news.actions';
import { Article } from 'src/components/article/article.class';

export const newsReducerToken = 'news';

export interface NewsState {
  newsByUser: Article[];
  newsList: any[];
}

export interface userWebSite {
  website_id: string[];
}

export const initialState: NewsState = {
  newsByUser: [],
  newsList: []
};

const reducer = createReducer(
  initialState,
  on(getArticlesByUserSuccess, (state, { articles }) => ({
    ...state,
    newsByUser: articles,
  })),
  on(getNewsByUserSuccess, (state, { news }) => ({
    ...state,
    newsList: news,
  }))
);

export function newsReducer(state: NewsState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectNewsState =
  createFeatureSelector<NewsState>(newsReducerToken);

export const selectAllNewsByUser = createSelector(
  selectNewsState,
  (state: NewsState) => state.newsByUser
);

export const selectNewsList = createSelector(
  selectNewsState,
  (state: NewsState) => state.newsList
);
