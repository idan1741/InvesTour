import { Injectable } from "@angular/core";
import { dispatch } from '@angular-redux/store';

export const SIGN_IN = "SIGN_IN";

@Injectable()
export class AppActions {

    constructor(){}

    @dispatch()
    public static signIn(user){
        return {
            type: SIGN_IN,
            payload: user
        }
    }
}
