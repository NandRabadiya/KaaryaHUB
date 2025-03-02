import { applyMiddleware, legacy_createStore } from "redux";
import authReducer from "./Auth/Reducer";
import ProjectReducer from "./Project/Project.Reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    project:ProjectReducer
});


export const store= legacy_createStore(rootReducer,applyMiddleware(thunk));