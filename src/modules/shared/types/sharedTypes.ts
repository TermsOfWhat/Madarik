export type months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export interface getParams {
  year?: number
  page?: number
  per_page?: number
  month?: months
}
export interface searchParams extends getParams {
  search_term?: string
}

export interface IDateRange {
  from: string
  to: string
}

export interface IAccount {
  id: string
  title: string
  number: string
}

export interface IDebitCredit {
  debit: number
  credit: number
}
