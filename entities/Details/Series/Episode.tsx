import { Platform } from "../Platform";

export class Episode {
    public airDate: Date;
    public episodeId?: number;
    public name: string;
    public overview?: string;
    public runtime?: number;
    public poster: string;
    public seen?: boolean;

    constructor(episode: Episode) {
        this.airDate = episode.airDate;
        this.episodeId = episode.episodeId;
        this.name = episode.name;
        this.poster = episode.poster;
        this.overview = episode.overview;
        this.runtime = episode.runtime;
        this.seen = episode.seen;
    }

    public static fromJson(json: any): Episode {
        return new Episode({
            airDate: new Date(json.airDate),
            episodeId: json.episodeId,
            name: json.name,
            overview: json.overview,
            runtime: json.runtime,
            poster: json.photo? json.photo : json.poster,
            seen: json.seen
        });
    }
}
