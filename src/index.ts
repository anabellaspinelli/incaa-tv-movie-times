const fetch = require('node-fetch')

const MOVIE_TITLE = 'Diablo viejo'
const MOVIE_ID = '4346'

type Movie = {
    anio: string,
    genero: string,
    hora_inicio: string,
    incaatv_id: string,
    movie_link: string,
    thumbnail: string,
    title: string,
    day?: number
}

type Cuesheet = Movie[]

async function getAirTimes() {
    const date: Date = new Date()
    const year: number = date.getFullYear()
    const month: number = date.getMonth()

    const fullMonth: String = month > 9 ? `${month}` : `0${month}`

    const numberOfDaysInMonth: number = new Date(year, month, 0).getDate()
    const daysOfTheMonth: number[] = getIntegersInRange(1, numberOfDaysInMonth)

    /**
     * A "cuesheet" is the list of movies that will play on any given day
     * and the time they start, as defined by cine.ar's API.
     */
    const cuesheetsOfTheMonth: Cuesheet[] = await Promise.all(
        daysOfTheMonth.map(day => fetchCuesheet(year.toString(), fullMonth, day.toString()))
    )

    const movieAirTimes = cuesheetsOfTheMonth.reduce((cuesheetAccum, cuesheet, index) => {
        const matchingMovies = cuesheet.reduce((movieAccum: Movie[], movie: Movie) => {
            if (movie.title === MOVIE_TITLE || movie.incaatv_id === MOVIE_ID) {
                movieAccum.push({ ...movie, day: index + 1 })
            }

            return movieAccum
        }, [])

        if (matchingMovies.length > 0) {
            cuesheetAccum = [...cuesheetAccum, ...matchingMovies]
        }

        return cuesheetAccum
    }, [])

    console.log({ movieAirTimes })
}

function getIntegersInRange(min: number, max: number): number[] {
    const numbers = []
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    return numbers
}

async function fetchCuesheet(year: String, month: String, day: String): Promise<Cuesheet> {
    console.info(`Fetching ${year} ${month} ${day}`)
    let response

    try {
        response = await fetch(
            `http://tv.cine.ar/wp-content/plugins/ff_gsheet_importer/ff_incaatv_ajax_api.php?op=cuesheet-list&date=${year}${month}${day}`
        )
    } catch (err) {
        console.error(`❌ Failed to fetch ${year} ${month} ${day}`)
        console.error(err)
    }



    console.info(`✅ Received ${year} ${month} ${day}`)
    return response.json()
}

/////////////////////////////
getAirTimes()

// fetch(`http://tv.cine.ar/wp-content/plugins/ff_gsheet_importer/ff_incaatv_ajax_api.php?op=cuesheet-list&date=20200730`)
// {
//     incaatv_id: '4346',
//     thumbnail: '',
//     title: 'Diablo viejo',
//     anio: '',
//     genero: '',
//     hora_inicio: '18:00',
//     movie_link: 'http://tv.cine.ar/movie/4346/'
// },
