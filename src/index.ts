import { findMovieTimeInCuesheet, getFormattedDatesOfTheMonth } from './utils'
import { fetchCuesheet } from './transport'

const MOVIE: Movie = {
    incaatv_id: '4346',
    title: 'Diablo Viejo',
}

async function getAirTimes() {
    const date: Date = new Date()
    const formattedDatesOfTheMonth = getFormattedDatesOfTheMonth(date)

    /**
     * A "cuesheet" is the list of movies that will play on any given day
     * and the time they start, as defined by cine.ar's API.
     */
    const cuesheetsOfTheMonth: Cuesheet[] = await Promise.all(
        formattedDatesOfTheMonth.map((date) => fetchCuesheet(date)),
    )

    const movieAirTimes = cuesheetsOfTheMonth.reduce(
        (cuesheetAccum, cuesheet, index) => {
            const day = index + 1
            const matchingMovies = findMovieTimeInCuesheet(
                cuesheet,
                MOVIE,
            ).map((movie) => ({ ...movie, day }))

            if (matchingMovies.length > 0) {
                cuesheetAccum = [...cuesheetAccum, ...matchingMovies]
            }

            return cuesheetAccum
        },
        [],
    )

    // console.log({ movieAirTimes })
    return movieAirTimes
}

getAirTimes()
