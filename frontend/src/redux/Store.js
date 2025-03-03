import { applyMiddleware, legacy_createStore } from "redux";
import authReducer from "./Auth/Reducer";
import ProjectReducer from "./Project/Project.Reducer";
import { comment } from "postcss";
import issueReducer from "./Issue/Issue.reducer";
import ChatReducer from "./Chat/Reducer";
import commentReducer from "./Comment/comment.reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    project:ProjectReducer,
    chat:ChatReducer,
    issue:issueReducer,
    comment:commentReducer
});


export const store= legacy_createStore(rootReducer,applyMiddleware(thunk));