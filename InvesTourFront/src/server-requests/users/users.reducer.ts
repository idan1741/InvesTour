import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { addUser, loginSuccess } from "./users.actions";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string
} 

export const usersReducerToken = 'users';

export interface UsersState {
    userId: string;
    firstName: string;
    lastName: string;
    email: string 
}

export const initialState: UsersState = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null
}

const reducer = createReducer(
    initialState,
    on(loginSuccess, (state, user) => {
        return({ 
        ...state, 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email,
        userId: user.userId
    })})
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
    (state: UsersState) => state.lastName
)
export const selectUsersEmail = createSelector(
    selectUsersState, 
    (state: UsersState) => state.email
)


