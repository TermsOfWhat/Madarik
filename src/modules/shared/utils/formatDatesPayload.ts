import { IDateRange } from "../types/sharedTypes";

export const addAnHourToDate = (date: string) => {
    const dateObj = new Date(date)
    dateObj.setUTCHours(dateObj.getUTCHours() + 1);
    return dateObj.toISOString()
}


// I add one hour because the selected date is utc + 1 , and when it's sent to the backend it's converted to utc 
// 00:00 1 / 1 / 2022 => 23:00 31 / 12 / 2021 => return an error of date range should be in the current exercice (ie: 2022)
export const formatDatesPayload = (dates: IDateRange | undefined) => {
    if (!dates) return null
    const result = {
        from: dates.from ? addAnHourToDate(dates.from) : '',
        to: dates.to ? addAnHourToDate(dates.to) : '',
    }
    if (dates.from && dates.to) {
        return result
    } else return null
}
