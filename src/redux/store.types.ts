import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { rootReducer } from "./store";

type RootReducer = typeof rootReducer
export type AppStateType = ReturnType<RootReducer>
export type InferActionsTypes<T> = T extends {[key: string]: (...args:any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
