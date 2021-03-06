export type MovieTime = {
    anio: string
    genero: string
    hora_inicio: string
    incaatv_id: string
    movie_link: string
    thumbnail: string
    title: string
    day?: number
}

export type Cuesheet = MovieTime[]

export type Movie = {
    incaatv_id: string
    title: string
    anio?: string
    genero?: string
    movie_link?: string
    thumbnail?: string
}
