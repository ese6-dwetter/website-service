import { AuthenticationActionType } from "./authentication.action.types";
import User from "../entities/User.entity";

export function loginAction(user: User) {
    return (dispatch: any) => {
        dispatch({
            type: AuthenticationActionType.LOGIN,
            payload: user,
        });
    }
}

export function logoutAction() {
    return (dispatch: any) => {
        dispatch({
            type: AuthenticationActionType.LOGOUT,
            payload: '',
        });
    }
}
