export class ContentEntry {
    public id: string
    public title: string
    public poster: string
    public available: boolean
    public score: number
    public seen: boolean
    public inWatchlist: boolean

    constructor(content: ContentEntry) {
        this.id = content.id
        this.title = content.title
        this.poster = content.poster
        this.available = content.available
        this.score = content.score
        this.seen = content.seen
        this.inWatchlist = content.inWatchlist
    }

}

