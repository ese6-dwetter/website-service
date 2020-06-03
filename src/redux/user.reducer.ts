import { UserActionType } from "./user.types";
import { initialUserState } from "../entities/User";

const initialState = {
    user: initialUserState
};

function userReducer(state = initialState, action: any): any {
    switch (action.type) {
        case UserActionType.LOGIN:
            action.payload.isAuthenticated = true;
            
            return state = {
                ...state,
                user: action.payload
            };
        case UserActionType.LOGOUT:
            return state = {
                ...state,
                user: initialUserState
            };
        default:
            return state = {
                ...state,
                user: initialUserState
            };
    }
}

export default userReducer