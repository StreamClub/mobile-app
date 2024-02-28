export class Content {
    public id: string
    public title: string
    public poster: string
    public seen: boolean
    public inWatchlist: boolean

    constructor(content: Content) {
        this.id = content.id
        this.title = content.title
        this.poster = content.poster
        this.seen = content.seen
        this.inWatchlist = content.inWatchlist
    }

    public static fromJson(content: any): Content {
        return new Content({
            id: content.id,
            poster: content.poster,
            title: content.title,
            seen: content.seen,
            inWatchlist: content.inWatchlist,
        })
    }

}

