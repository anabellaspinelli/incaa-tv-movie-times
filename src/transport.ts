import fetch from 'node-fetch'
import { Cuesheet } from './types'

export async function fetchCuesheet(date: string): Promise<Cuesheet> {
    console.info(`Fetching ${date}`)

    try {
        const response = await fetch(
            `http://tv.cine.ar/wp-content/plugins/ff_gsheet_importer/ff_incaatv_ajax_api.php?op=cuesheet-list&date=${date}`,
        )

        console.info(`✅ Received ${date}`)

        return response.json()
    } catch (err) {
        console.error(`❌ Failed to fetch ${date}`)
        console.error(err)

        return err
    }
}
