import { UserActionType } from "./user.types";
import User from "../entities/User";

export function login(user: User) {
    return (dispatch: any) => {
        dispatch({
            type: UserActionType.Login,
            payload: user,
        });
    }
}

export function logout() {
    return (dispatch: any) => {
        dispatch({
            type: UserActionType.Logout,
            payload: '',
        });
    }
}
