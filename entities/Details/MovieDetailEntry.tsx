import { ContentDetail } from './ContentDetailEntry'

export class MovieDetail extends ContentDetail {
    public directors: string[]
    public runtime: number
    public seen: boolean

    constructor(movie: MovieDetail) {
        super(movie)
        this.directors = movie.directors
        this.runtime = movie.runtime
        this.seen = movie.seen
    }

    public static fromJson(movie: any): MovieDetail {
        const content = ContentDetail.fromJson(movie)
        return new MovieDetail({
            seen: movie.seen,
            directors: movie.directors,
            runtime: movie.runtime,
            ...content,
        })
    }
}
