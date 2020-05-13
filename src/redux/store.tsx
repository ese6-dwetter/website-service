import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import userReducer from "./user.reducer";

const loggerMiddleware = createLogger();

export default createStore(
    combineReducers({
        userReducer,
    }),
    {}, // Preloaded state
    applyMiddleware(
        thunkMiddleware, // Makes it possible to dispatch
        loggerMiddleware, // Logs actions
    )
);