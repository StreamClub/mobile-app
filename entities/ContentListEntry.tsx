import { Content } from "./Content"

export class ContentEntry extends Content {
    public available: boolean
    public score: number

    constructor(content: ContentEntry) {
        super(content)
        this.available = content.available
        this.score = content.score
    }

    public static fromJson(json: any): ContentEntry {
        const content = Content.fromJson(json)
        return new ContentEntry({
            available: json.available,
            score: json.score.toFixed(2),
            ...content
        })
    }

}

