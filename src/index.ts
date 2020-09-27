import { writeFile } from 'fs'

import { Movie } from './types'
import { getAirTimes } from './airtimes'
import { getFormattedDatesOfTheMonth } from './utils'

const MOVIE: Movie = {
    incaatv_id: '4346',
    title: 'Diablo Viejo',
}

const date = new Date()
const formattedDatesOfTheMonth = getFormattedDatesOfTheMonth(date)

getAirTimes(MOVIE, formattedDatesOfTheMonth).then((airtimes) => {
    writeFile('airtimes.json', JSON.stringify(airtimes), () =>
        console.log('done writing file 🎉'),
    )
})
