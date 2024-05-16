import {
    ARTISTS_NAME,
    MOVIES_NAME,
    SERIES_NAME,
    USERS_NAME,
} from '../constants'
import { ArtistEntry } from '../entities/ArtistListEntry'
import { MovieEntry } from '../entities/MovieListEntry'
import { SeriesEntry } from '../entities/SeriesListEntry'

export const serializeSearchResults = (results: any[], category: string) => {
    switch (category) {
        case MOVIES_NAME:
            return results.map((entry: MovieEntry) => {
                return MovieEntry.serialize(entry)
            })
        case SERIES_NAME:
            return results.map((entry: SeriesEntry) => {
                return SeriesEntry.serialize(entry)
            })
        case ARTISTS_NAME:
            return results.map((entry: ArtistEntry) => {
                return ArtistEntry.serialize(entry)
            })
        case USERS_NAME:
            return [] //TODO: Implement user serialization
        default:
            return []
    }
}
