import { initialState, newsActions } from "./news.reducer";
import { BaseThunkType, InferActionsTypes } from "../store.types";

export type NewsReducerInitialStateType = typeof initialState
export type NewsReducerActionTypes = InferActionsTypes<typeof newsActions>
export type NewsReducerThunkTypes = BaseThunkType<NewsReducerActionTypes>
