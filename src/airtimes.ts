import { findMovieTimesInCuesheet } from './utils'
import { fetchCuesheet } from './transport'
import { Cuesheet, Movie } from './types'

export async function getAirTimes(
    movie: Movie,
    formattedDatesOfTheMonth: string[],
): Promise<Cuesheet> {
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
            const matchingMovies = findMovieTimesInCuesheet(
                cuesheet,
                movie,
            ).map((matchingMovie) => ({ ...matchingMovie, day }))

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
