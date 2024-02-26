export class ContentType {
    public type: string
    constructor(type: 'movie' | 'series' | 'season' | 'episode') {
        this.type = type
    }

    public isMovie(): boolean {
        return this.type === 'movie'
    }

    public isSeries(): boolean {
        return this.type === 'series'
    }

    public isSeason(): boolean {
        return this.type === 'season'
    }

    public isEpisode(): boolean {
        return this.type === 'episode'
    }
}