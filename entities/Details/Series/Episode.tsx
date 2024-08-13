export class Episode {
    public airDate: string
    public episodeId?: number
    public name: string
    public overview?: string
    public runtime?: number
    public poster: string
    public seen?: number

    constructor(episode: Episode) {
        this.airDate = episode.airDate
        this.episodeId = episode.episodeId
        this.name = episode.name
        this.poster = episode.poster
        this.overview = episode.overview
        this.runtime = episode.runtime
        this.seen = episode.seen
    }

    public static fromJson(json: any): Episode {
        return new Episode({
            airDate: new Date(json.airDate).toISOString(),
            episodeId: json.episodeId,
            name: json.name,
            overview: json.overview,
            runtime: json.runtime,
            poster: json.photo ? json.photo : json.poster,
            seen: json.seen,
        })
    }
}
