
export class WatchlistEntry {
    public contentId: number
    public category: "movie" | "series"

    constructor(contentId: number, category: "movie" | "series") {
        this.contentId = contentId
        this.category = category
    }

    // public static fromJson(movie: any): MovieEntry {
    //     const content = ContentEntry.fromJson(movie)
    //     return new MovieEntry({
    //         year: movie.releaseDate.split('-')[0],
    //         ...content,
    //     })
    // }

    // public static serialize(movie: MovieEntry): any {
    //     return {
    //         ...ContentEntry.serialize(movie),
    //         year: movie.year,
    //     }
    // }
}
