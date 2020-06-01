import { UserActionType } from "./user.types";
import { initialUserState } from "../entities/User";

const initialState = {
    user: initialUserState,
    isAuthenticated: false
};

function userReducer(state = initialState, action: any): any {
    switch (action.type) {
        case UserActionType.Login:
            return state = {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case UserActionType.Logout:
            return state = {
                ...state,
                user: initialUserState,
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default userReducer