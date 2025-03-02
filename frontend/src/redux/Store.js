import { applyMiddleware, legacy_createStore } from "redux";
import authReducer from "./Auth/Reducer";

const rootReducer = combineReducers({
    auth:authReducer
});


export const store= legacy_createStore(rootReducer,applyMiddleware(thunk));