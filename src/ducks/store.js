import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let storeMiddleware = composeEnhancers(applyMiddleware(thunk));
export default createStore(rootReducer, storeMiddleware);
