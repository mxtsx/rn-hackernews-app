import { AuthorType, NewsIdsType, NewsType } from "../../types/data.types";
import { newsApi } from "../../api/news.api";
import { NewsReducerActionTypes, NewsReducerInitialStateType, NewsReducerThunkTypes } from "./news-reducer.types";
import { store } from "../store";

const SET_NEWS_IDS = 'news/SET_NEWS_IDS'
const SET_NEWS = 'news/SET_NEWS'
const SET_ERROR = 'news/SET_ERROR'
const CLEAR_ERROR = 'news/CLEAR_ERROR'
const SET_IS_LOADING = 'news/SET_IS_LOADING'

export const initialState = {
  newsIds: [] as NewsIdsType,
  news: [] as Array<NewsType>,
  error: null as null | string,
  isLoading: false
}

export const newsReducer = (state = initialState, action: NewsReducerActionTypes): NewsReducerInitialStateType => {
  switch (action.type) {
    case SET_NEWS_IDS:
      return {
        ...state,
        newsIds: action.payload.newsIds.sort(() => 0.5 - Math.random()).slice(0, 10)
      }
    case SET_NEWS: {
      return {
        ...state,
        news: action.payload.news
      }
    }
    case SET_ERROR:
      return {
        ...state,
        error: 'Something went wrong'
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    default:
      return state
  }
}

export const newsActions = {
  newsIdsGot: (newsIds: NewsIdsType) => ({type: SET_NEWS_IDS, payload: {newsIds}} as const),
  newsSet: (news: Array<NewsType>) => ({type: SET_NEWS, payload: {news}} as const),
  errorSet: () => ({type: SET_ERROR} as const),
  errorCleared: () => ({type: CLEAR_ERROR} as const),
  isLoadingSet: (isLoading: boolean) => ({type: SET_IS_LOADING, payload: {isLoading}} as const)
}

export const tryCatchBlock = async (func: any, dispatch: typeof store.dispatch, ...args: any) => {
  dispatch(newsActions.errorCleared())
  dispatch(newsActions.isLoadingSet(true))
  try {
    await dispatch(func(...args))
  } catch (e) {
    dispatch(newsActions.errorSet())
    console.error(e)
  } finally {
    dispatch(newsActions.isLoadingSet(false))
  }
}

const _getNewsIds = (): NewsReducerThunkTypes => async dispatch => {
  const res = await newsApi.getNewsIds()
  if(res.status === 200) {
    dispatch(newsActions.newsIdsGot(res.data))
  }
}
export const getNewsIds = (): NewsReducerThunkTypes => async dispatch => {
  await tryCatchBlock(_getNewsIds, dispatch)
}

const _getNews = (ids: NewsIdsType): NewsReducerThunkTypes => async dispatch => {
  let newsArray: Array<NewsType> = []
  let authorsArray: Array<AuthorType> = []
  await Promise.all(ids.map(async id => {
    const news = await newsApi.getNews(id)
    const authors = await newsApi.getAuthor(news.data.by)
    newsArray.push(news?.data)
    authorsArray.push(authors?.data)
  }));
  const newsWithKarmaArray = newsArray.map(n => {
    return {...n, karma: authorsArray.find(a => a.id === n.by)?.karma}
  })
  dispatch(newsActions.newsSet(newsWithKarmaArray))
}
export const getNews = (ids: NewsIdsType): NewsReducerThunkTypes => async dispatch => {
  await tryCatchBlock(_getNews, dispatch, ids)
}
