import { Cuesheet, Movie, MovieTime } from './types'

export function getIntegersInRange(min: number, max: number): number[] {
    const numbers = []
    for (let i = min; i <= max; i++) {
        numbers.push(i)
    }

    return numbers
}

export function getFormattedDatesOfTheMonth(date: Date): string[] {
    const year: number = date.getFullYear()
    const month: number = date.getMonth() + 1 // these months are 0-indexed, the API is not. This way we query for the current month.
    const formattedMonth: string = month > 9 ? `${month}` : `0${month}`

    const numberOfDaysInMonth: number = new Date(year, month, 0).getDate()
    const daysOfTheMonth: string[] = getIntegersInRange(
        1,
        numberOfDaysInMonth,
    ).map((day) => (day > 9 ? `${day}` : `0${day}`))

    return daysOfTheMonth.map((day) => `${year}${formattedMonth}${day}`)
}

export function findMovieTimesInCuesheet(cuesheet: Cuesheet, movie: Movie) {
    return cuesheet.reduce(
        (movieTimeAccum: MovieTime[], movieTime: MovieTime) => {
            if (
                movieTime.title === movie.title ||
                movieTime.incaatv_id === movie.incaatv_id
            ) {
                movieTimeAccum.push({ ...movieTime })
            }

            return movieTimeAccum
        },
        [],
    )
}
