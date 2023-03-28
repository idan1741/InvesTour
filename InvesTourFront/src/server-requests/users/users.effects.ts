import { map, switchMap, tap } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { addUser, deleteUser, getUserById, loginSuccess, loginUser } from "./users.actions";
import { RequestConfigService } from "../requests.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {
    addNewUser = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            switchMap((userInfo) => this.configService.addUser(userInfo).pipe(
                tap((res) => console.log(res))
            ))
        ),
        { dispatch: false }
    )

    deleteUser = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            switchMap(({userId}) => this.configService.deleteUser(userId).pipe(
                tap((res) => console.log(res))
            ))
        ),
        { dispatch: false }
    )

    getUser = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserById),
            switchMap(({userId}) => this.configService.getUserById(userId).pipe(
                tap((res) => console.log(res))
            ))
        ),
        { dispatch: false }
    )

    loginUser = createEffect(() =>
        this.actions$.pipe(
            ofType(loginUser),
            // TODO: to be deprecated when working with server
            tap(() => {
                this.store.dispatch(loginSuccess({firstName: 'Tom', lastName: 'Brady'}));
                this.router.navigateByUrl('/myWall')
            }),
            switchMap(({email, password}) => this.configService.loginUser(email, password).pipe(
                tap((res) => console.log(res)),
                tap(res => {
                    // check response authenticity and retract user info
                    if(true) {
                        this.store.dispatch(loginSuccess({firstName: 'tom', lastName: 'brady'}));
                        this.router.navigateByUrl('/myWall')
                    } else {
                        alert("could not log in")
                    }
                })
            ))
        ),
        { dispatch: false }
    )

    constructor(
        private readonly actions$: Actions, 
        private configService: RequestConfigService, 
        private store: Store,
        private router: Router
    ){}
}