import { writeFile } from 'fs'

import { Movie } from './types'
import { getAirTimes } from './airtimes'
import { getFormattedDatesOfTheMonth, getMonthName } from './utils'

const MOVIE: Movie = {
    incaatv_id: '4346',
    title: 'Diablo Viejo',
}

const date = new Date()
const formattedDatesOfTheMonth = getFormattedDatesOfTheMonth(date)
const monthName = getMonthName(date)

getAirTimes(MOVIE, formattedDatesOfTheMonth).then((airtimes) => {
    const airtimesWithMonth = airtimes.map((airtime) => ({
        ...airtime,
        month: monthName,
    }))

    writeFile('airtimes.json', JSON.stringify(airtimesWithMonth), () =>
        console.log('done writing file 🎉'),
    )
})
