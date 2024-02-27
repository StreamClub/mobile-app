import { ContentDetail } from "./ContentDetailEntry"

export class MovieDetail extends ContentDetail {
    public directors: string[];
    public runtime: number;

    constructor(movie: MovieDetail) {
        super(movie);
        this.directors = movie.directors;
        this.runtime = movie.runtime;
    }

    public static fromJson(movie: any): MovieDetail {
        const content = ContentDetail.fromJson(movie)
        return new MovieDetail({
            directors: movie.directors,
            runtime: movie.runtime,
            ...content
        })
    }

}