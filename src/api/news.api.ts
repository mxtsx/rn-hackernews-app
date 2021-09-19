import { instance } from "./api";
import { AuthorType, NewsIdsType, NewsType } from "../types/data.types";

export const newsApi = {
  getNewsIds() {
    return instance.get<NewsIdsType>('topstories.json')
  },
  getNews(id: number) {
    return instance.get<NewsType>(`item/${id}.json`)
  },
  getAuthor(id: string) {
    return instance.get<AuthorType>(`user/${id}.json`)
  }
}
