import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { addUser, loginSuccess } from "./users.actions";

export const usersReducerToken = 'users';

export interface UsersState {
    userId: string;
    firstName: string;
    lastNAme: string;
    email: string 
}

export const initialState: UsersState = {
    userId: null,
    firstName: null,
    lastNAme: null,
    email: null
}

const reducer = createReducer(
    initialState,
    on(loginSuccess, (state, {firstName, lastName}) => ({ ...state, firstName, lastName}))
)

export function usersReducer(state: UsersState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectUsersState = createFeatureSelector<UsersState>(usersReducerToken);

export const selectUserId = createSelector(
    selectUsersState,
    (state: UsersState) => state.userId
)

export const selectUsersFirstName = createSelector(
    selectUsersState, 
    (state: UsersState) => state.firstName
)
export const selectUsersLastName = createSelector(
    selectUsersState, 
    (state: UsersState) => state.lastNAme
)
export const selectUsersEmail = createSelector(
    selectUsersState, 
    (state: UsersState) => state.email
)


