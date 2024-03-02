import { ContentEntry } from './ContentListEntry'

export class MovieEntry extends ContentEntry {
    public year: string

    constructor(movie: MovieEntry) {
        super(movie)
        this.year = movie.year
    }

    public static fromJson(movie: any): MovieEntry {
        const content = ContentEntry.fromJson(movie)
        return new MovieEntry({
            year: movie.releaseDate.split('-')[0],
            ...content,
        })
    }

    public static serialize(movie: MovieEntry): any {
        return {
            ...ContentEntry.serialize(movie),
            year: movie.year,
        }
    }
}
