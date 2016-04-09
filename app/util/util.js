/**
 * @author huntbao
 */

module.exports = {
  getDate(date) {
    let now = new Date()
    let thisYear = now.getFullYear()
    let d = new Date(date)
    let hour = d.getHours()
    let minute = d.getMinutes()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (d.getFullYear() === thisYear) {
      return `${d.getMonth() + 1}-${d.getDate()} ${hour}:${minute}`
    } else {
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${hour}:${minute}`
    }
  }
}
