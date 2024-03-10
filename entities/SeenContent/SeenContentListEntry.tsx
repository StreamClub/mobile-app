import { Content } from '../Content'

export class SeenContentListEntry extends Content {
    public updatedAt: string
    public hasReview: boolean
    public liked: boolean

    constructor(seenContent: SeenContentListEntry) {
        super(seenContent)
        this.updatedAt = seenContent.updatedAt
        this.hasReview = seenContent.hasReview
        this.liked = seenContent.liked
    }

    public static fromJson(json: any): SeenContentListEntry {
        const seenContent = Content.fromJson(json)
        return new SeenContentListEntry({
            updatedAt: json.updatedAt,
            hasReview: json.hasReview,
            liked: json.liked,
            ...seenContent,
        })
    }

    public static serialize(seenContentEntry: SeenContentListEntry): any {
        return {
            ...super.serialize(seenContentEntry),
            updatedAt: seenContentEntry.updatedAt,
            hasReview: seenContentEntry.hasReview,
            liked: seenContentEntry.liked,
        }
    }
}
