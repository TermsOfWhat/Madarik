import {
  format,
  getTime,
  formatDistanceToNow,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'

type InputValue = Date | string | number | null | undefined

/**
 * @returns Example: "15 Jan 2023"
 */
export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy'
  return date ? format(new Date(date), fm) : ''
}

/**
 * @returns Example: "15/01/2023"
 */
export function fDateSlash(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy'
  return date ? format(new Date(date), fm) : ''
}

/**
 * @returns Example: "15 Jan 2023 2:30 PM"
 */
export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p'
  return date ? format(new Date(date), fm) : ''
}

/**
 * @returns Example: 1673791200000
 */
export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : ''
}

/**
 * @returns Example: "2 days ago"
 */
export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : ''
}

/**
 * @returns Example: "14:30"
 */
export function fGetHour(date: InputValue) {
  const fm = 'HH:mm'
  return date ? format(new Date(date), fm) : ''
}

/**
 * @returns Example: "2 jour(s)" or "5 heure(s)" or "30 minute(s)"
 */
export function getTimeDifference(date1: InputValue, date2: InputValue): string {
  if (!date1 || !date2) return 'Invalid date input'

  const startDate = new Date(date1)
  const endDate = new Date(date2)

  const daysDifference = differenceInDays(startDate, endDate)
  if (daysDifference >= 1) {
    return `${daysDifference} jour(s)`
  }

  const hoursDifference = differenceInHours(startDate, endDate)
  if (hoursDifference >= 1) {
    return `${hoursDifference} heure(s)`
  }

  const minutesDifference = differenceInMinutes(startDate, endDate)
  return `${minutesDifference} minute(s)`
}

/**
 * @returns Example: "14:30:45"
 */
export function fGetHourWithSeconds(date: InputValue) {
  const fm = 'HH:mm:ss'
  return date ? format(new Date(date), fm) : ''
}

/**
 * @returns Example: 15
 */
export function fGetDay(date: InputValue): number {
  if (!date) return 0
  return new Date(date).getDate()
}

/**
 * @returns Example: "15/01/2023"
 */
export const formatIsoStringToDate = (date: string) => {
  return date?.slice(0, 10).replace(/-/g, '/').split('/').reverse().join('/')
}

/**
 * @returns Example: "15/01/2023 - 14:30:45"
 */
export function formatIsoToCustomDate(isoString: string): string {
  const date = new Date(isoString)
  return format(date, 'dd/MM/yyyy - HH:mm:ss')
}
