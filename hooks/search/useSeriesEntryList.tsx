import { ArtistEntry } from '../../entities/ArtistListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'

export const useDataToSerieEntryList = () => {
    const toSeriesListEntries = (data: any) => {
        const seriesList: SeriesEntry[] = []
        const seriesResponse = data.results
        seriesResponse.forEach((serie: any) => {
            const serieEntry: SeriesEntry = SeriesEntry.fromJson(serie)
            seriesList.push(serieEntry)
        })
        return seriesList
    }

    const toMovieListEntries = (data: any) => {
        const movieList: MovieEntry[] = []
        const moviesResponse = data.results
        moviesResponse.forEach((movie: any) => {
            const movieEntry: MovieEntry = MovieEntry.fromJson(movie)
            movieList.push(movieEntry)
        })
        return movieList
    }

    const toArtistListEntries = (data: any) => {
        const artistList: ArtistEntry[] = []
        const artistResponse = data.results
        artistResponse.forEach((artist: any) => {
            const artistEntry: ArtistEntry = ArtistEntry.fromJson(artist)
            artistList.push(artistEntry)
        })
        return artistList
    }

    return { toSeriesListEntries, toMovieListEntries, toArtistListEntries }
}