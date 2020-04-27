import { ActionType } from "./types";

const initialState = {
    user: null,
    isAuthenticated: false
};

function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case ActionType.Login:
            return state = {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case ActionType.Logout:
            return state = {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default userReducer;
