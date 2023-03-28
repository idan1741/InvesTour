import { createAction, props } from "@ngrx/store";

export enum UsersActions {
    ADD_USER = '[Users] add user',
    DELETE_USER = '[Users] delete user',
    GET_USER_BY_ID = '[Users] get user by id',
    LOGIN_USER = '[Users] login user',
    LOGIN_SUCCESS = '[Users] login success'
}

export const addUser = createAction(
    UsersActions.ADD_USER,
    props<{ firstName: string, lastName: string, email: string, password: string }>()
)

export const deleteUser = createAction(
    UsersActions.DELETE_USER,
    props<{ userId: string }>()
)

export const getUserById = createAction(
    UsersActions.GET_USER_BY_ID,
    props<{ userId: string }>()
)

export const loginUser = createAction(
    UsersActions.LOGIN_USER,
    props<{ email: string, password: string }>()
)

export const loginSuccess = createAction(
    UsersActions.LOGIN_SUCCESS,
    props<{ firstName: string, lastName: string }>()
)
