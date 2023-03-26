import { combineReducers } from "redux";
import { articlesReducer, ARTICLES_INITIAL_STATE } from "src/my-wall/articles-reducer";
import { AppActions, SIGN_IN } from "./app-actions";


export const INITIAL_APP_STATE = {
    user: {
        firstName: "Noam",
        lastName: "Golan"
    },
    isSignedIn: false
}

export const INITIAL_STATE = {
    app: INITIAL_APP_STATE,
    articles: ARTICLES_INITIAL_STATE
}
export function appReducer(state = INITIAL_APP_STATE, action) {
    switch(action.type) {
    case SIGN_IN:
        state.isSignedIn = true;
        state.user = action.payload.user
    default:
    return state;
    }
}

export const rootReducer = combineReducers(
    {
        app: appReducer,
        articles: articlesReducer
    }
)
