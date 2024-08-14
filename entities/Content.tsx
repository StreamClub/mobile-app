export class Content {
    public id: string
    public title: string
    public poster: string

    constructor(content: Content) {
        this.id = content.id
        this.title = content.title
        this.poster = content.poster
    }

    public static fromJson(content: any): Content {
        return new Content({
            id: content.id,
            poster: content.poster,
            title: content.title,
        })
    }

    public static serialize(content: Content): any {
        return {
            id: content.id,
            poster: content.poster,
            title: content.title,
        }
    }
}
