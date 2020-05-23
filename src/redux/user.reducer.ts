import { UserActionType } from "./user.types";

const initialState = {
    user: '',
    isAuthenticated: false
};

function userReducer(state = initialState, action: any) {
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
                user: '',
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export default userReducer