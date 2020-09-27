const fetch = require('node-fetch')

const MOVIE_TITLE = 'Diablo viejo'
const MOVIE_ID = '4346'

async function getAirTimes() { 
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const fullMonth = month > 9 ? `${month}` : `0${month}`
    const numberOfDaysInMonth = new Date(year, month, 0).getDate()

    const daysOfTheMonth = getIntegersInRange(1, numberOfDaysInMonth)

    console.log({year, fullMonth})

    const cuesheets = await Promise.all(
        daysOfTheMonth.map(day => fetchCuesheet(year, fullMonth, day))
    )

    const movieAirTimes = cuesheets.reduce((cuesheetAccum, cuesheet, index) => {
        const matchingMovies = cuesheet.reduce((movieAccum, movie) => {
            if (movie.title === MOVIE_TITLE || movie.incaatv_id === MOVIE_ID) {
                movieAccum.push({...movie, day: index+1})
            }

            return movieAccum
        }, [])

        if (matchingMovies.length > 0) {
            cuesheetAccum = [...cuesheetAccum, ...matchingMovies]      
        }

        return cuesheetAccum
    },[])

    console.log(movieAirTimes)
}

function getIntegersInRange(min, max) {
    const numbers = []
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    return numbers
}

async function fetchCuesheet(year, month, day) {
    let response

    try {
        response = await fetch(
            `http://tv.cine.ar/wp-content/plugins/ff_gsheet_importer/ff_incaatv_ajax_api.php?op=cuesheet-list&date=${year}${month}${day}`
        )
    } catch (err) {
        console.error(err)
    }
        
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