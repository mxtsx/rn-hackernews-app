import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { newsReducer } from "./newsReducer/news.reducer";

export const rootReducer = combineReducers({
  news: newsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
