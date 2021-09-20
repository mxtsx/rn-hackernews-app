export const dateConverter = (timestamp: number) => {
  const time = new Date(timestamp * 1000)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const year = time.getFullYear()
  const month = months[time.getMonth()]
  const date = time.getDate()
  const hours = time.getHours()
  const minutes = '0' + time.getMinutes()
  const seconds = '0' + time.getSeconds()
  return `${date} ${month} ${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}
