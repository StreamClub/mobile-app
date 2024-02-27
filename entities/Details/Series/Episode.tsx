import { Platform } from "../Platform";

export class Episode {
    public airDate: Date;
    public episodeId?: number;
    public name: string;
    public overview?: string;
    public runtime?: number;
    public poster: string;
    public platforms?: Platform[];

    constructor(episode: Episode) {
        this.airDate = episode.airDate;
        this.episodeId = episode.episodeId;
        this.name = episode.name;
        this.poster = episode.poster;
        this.overview = episode.overview;
        this.platforms = episode.platforms;
        this.runtime = episode.runtime;
    }

    public static fromJson(json: any): Episode {
        console.log(json.photo)
        return new Episode({
            airDate: new Date(json.airDate),
            episodeId: json.episodeId,
            name: json.name,
            overview: json.overview,
            runtime: json.runtime,
            poster: json.photo,
            platforms: json.platforms? json.platforms.map((item: any) => Platform.fromJson(item)) : null
        });
    }
}
