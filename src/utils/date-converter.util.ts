export const dateConverter = (timestamp: number) => {
  const time = new Date(timestamp * 1000)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const year = time.getFullYear()
  const month = months[time.getMonth()]
  const date = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return `${date} ${month} ${year} ${hours}:${minutes}:${seconds}`
}
