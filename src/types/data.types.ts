export type NewsIdsType = Array<number>
export type NewsType = {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  url: string,
  karma?: number
}
export type AuthorType = {
  id: string,
  karma: number
}
