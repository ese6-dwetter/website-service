import { UserActionType } from "./user.types";

export function login(token: string) {
    return (dispatch: any) => {
        dispatch({
            type: UserActionType.Login,
            payload: token,
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
