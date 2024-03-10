import { Content } from './Content'

export class ContentEntry extends Content {
    public available: boolean
    public score: number
    public seen: boolean
    public inWatchlist: boolean

    constructor(content: ContentEntry) {
        super(content)
        this.available = content.available
        this.score = content.score
        this.seen = content.seen
        this.inWatchlist = content.inWatchlist
    }

    public static fromJson(json: any): ContentEntry {
        const content = Content.fromJson(json)
        return new ContentEntry({
            seen: json.seen,
            inWatchlist: json.inWatchlist,
            available: json.available,
            score: json.score.toFixed(2),
            ...content,
        })
    }

    public static serialize(contentEntry: ContentEntry): any {
        return {
            ...super.serialize(contentEntry),
            available: contentEntry.available,
            score: contentEntry.score,
            seen: contentEntry.seen,
            inWatchlist: contentEntry.inWatchlist,
        }
    }
}
