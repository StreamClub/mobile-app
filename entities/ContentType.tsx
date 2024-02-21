export class ContentType {
    public type: string
    constructor(type: 'movie' | 'series') {
        this.type = type
    }

    public isMovie(): boolean {
        return this.type === 'movie'
    }

    public isSeries(): boolean {
        return this.type === 'series'
    }
}