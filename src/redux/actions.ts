import { ActionType } from "./types";

export function login(token: any) {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.Login,
            payload: token
        });
    }
}

export function logout() {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.Logout,
            payload: null
        });
    }
}
