import { UserActionType } from "./user.types";
import User from "../entities/User";

export function login(user: User) {
    return (dispatch: any) => {
        dispatch({
            type: UserActionType.LOGIN,
            payload: user,
        });
    }
}

export function logout() {
    return (dispatch: any) => {
        dispatch({
            type: UserActionType.LOGOUT,
            payload: '',
        });
    }
}
