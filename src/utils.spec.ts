import { findMovieTimeInCuesheet, getIntegersInRange } from './utils'

describe('getIntegersInRange', () => {
    it('returns the integers in the given range', () => {
        expect(getIntegersInRange(1, 10)).toEqual([
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
        ])
    })

    it('includes the start and end numbers', () => {
        const rangeStart = 1
        const rangeEnd = 10
        const result = getIntegersInRange(rangeStart, rangeEnd)

        expect(result[0]).toEqual(rangeStart)
        expect(result[result.length - 1]).toEqual(rangeEnd)
    })
})

describe('findMovieInCuesheet', () => {
    it('finds the given movie by title and id', () => {
        const cuesheet = [
            { incaatv_id: '123', title: 'one two three' },
        ] as Cuesheet

        expect(
            findMovieTimeInCuesheet(cuesheet, {
                incaatv_id: '123',
                title: 'one two three',
            }),
        ).toEqual([{ incaatv_id: '123', title: 'one two three' }])
    })

    it('matches if movie ID is different', () => {
        const cuesheet = [
            { incaatv_id: '123', title: 'one two three' },
        ] as Cuesheet

        expect(
            findMovieTimeInCuesheet(cuesheet, {
                incaatv_id: '1234',
                title: 'one two three',
            }),
        ).toEqual([{ incaatv_id: '123', title: 'one two three' }])
    })

    it('matches if movie title is different', () => {
        const cuesheet = [
            { incaatv_id: '123', title: 'one two three' },
        ] as Cuesheet

        expect(
            findMovieTimeInCuesheet(cuesheet, {
                incaatv_id: '123',
                title: 'one two three four',
            }),
        ).toEqual([{ incaatv_id: '123', title: 'one two three' }])
    })

    it('finds multiple instances of the same movie', () => {
        const cuesheet = [
            { incaatv_id: '123', title: 'one two three' },
            { incaatv_id: '123', title: 'one two three' },
        ] as Cuesheet

        expect(
            findMovieTimeInCuesheet(cuesheet, {
                incaatv_id: '123',
                title: 'one two three four',
            }),
        ).toEqual([
            { incaatv_id: '123', title: 'one two three' },
            { incaatv_id: '123', title: 'one two three' },
        ])
    })
})
