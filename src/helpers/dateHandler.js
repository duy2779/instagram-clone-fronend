import moment from 'moment'

export const isThisMinute = (input) => {
    const oneMinutesAgo = moment().subtract(1, 'minutes');
    return moment(input).isAfter(oneMinutesAgo)
}

export const isToday = (input) => {
    const now = moment();
    return moment(input).isSame(now, 'day');
}

export const isThisWeek = (input) => {
    const now = moment();
    return (now.isoWeek() === moment(input).isoWeek())
}

export const isThisMonth = (input) => {
    const now = moment();
    return moment(input).isSame(now, 'month');
}