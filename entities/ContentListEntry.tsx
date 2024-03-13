import { Content } from './Content'

export class ContentEntry extends Content {
    public available: boolean
    public score: number
    public seen: boolean
    public status: string
    public inWatchlist: boolean

    constructor(content: ContentEntry) {
        super(content)
        this.available = content.available
        this.score = content.score
        this.status = content.status
        this.seen = content.seen
        this.inWatchlist = content.inWatchlist
    }

    public static fromJson(json: any): ContentEntry {
        const content = Content.fromJson(json)
        return new ContentEntry({
            status: json.status,
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
            status: contentEntry.status,
            score: contentEntry.score,
            seen: contentEntry.seen,
            inWatchlist: contentEntry.inWatchlist,
        }
    }
}
