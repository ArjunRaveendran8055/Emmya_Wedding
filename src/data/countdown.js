export function getCountdown(targetDate, now = Date.now()) {
  const target = new Date(targetDate).getTime()
  const distance = Math.max(target - now, 0)
  return {
    complete: distance === 0,
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}
