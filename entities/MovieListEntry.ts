import { ContentEntry } from "./ContentListEntry"

export class MovieEntry extends ContentEntry {
    public year: string

    constructor(movie: MovieEntry) {
        super(movie)
        this.year = movie.year
    }
}
