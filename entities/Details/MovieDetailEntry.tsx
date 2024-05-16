import { Review } from '../Review'
import { ContentDetail } from './ContentDetailEntry'

export class MovieDetail extends ContentDetail {
    public directors: string[]
    public runtime: number
    public seen: boolean
    public userReview: Review | null

    constructor(movie: MovieDetail) {
        super(movie)
        this.directors = movie.directors
        this.runtime = movie.runtime
        this.seen = movie.seen
        this.userReview = movie.userReview
    }

    public static fromJson(movie: any): MovieDetail {
        const content = ContentDetail.fromJson(movie)
        return new MovieDetail({
            seen: movie.seen,
            directors: movie.directors,
            runtime: movie.runtime,
            userReview: movie.userReview ? Review.fromJson(movie.userReview) : null,
            ...content,
        })
    }
}
