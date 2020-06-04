import { AuthenticationActionType } from "./authentication.action.types";
import { initialUserState } from "../entities/User.entity";

const initialAuthenticationState = {
    user: initialUserState,
    isAuthenticated: false
};

const authenticationReducer = (state = initialAuthenticationState, action: any): any => {
    switch (action.type) {
        case AuthenticationActionType.LOGIN:            
            return state = {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case AuthenticationActionType.LOGOUT:
            return state = {
                ...state,
                user: initialUserState,
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default authenticationReducer