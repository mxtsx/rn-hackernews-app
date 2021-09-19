import { AppStateType } from "../store.types";

export const getNewsIdsSelector = (state: AppStateType) => {
  return state.news.newsIds
}

export const getNewsSelector = (state: AppStateType) => {
  return state.news.news
}

export const getErrorSelector = (state: AppStateType) => {
  return state.news.error
}

export const getIsLoadingSelector = (state: AppStateType) => {
  return state.news.isLoading
}
