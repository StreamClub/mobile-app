import { Episode } from "./Episode";
import { Season } from "./Season";

export class SeasonDetail extends Season {
    public overview: string;
    public episodes: Episode[];

    constructor(season: SeasonDetail) {
        super(season);
        this.overview = season.overview;
        this.episodes = season.episodes;
    }

    public static fromJson(json: any, seriesId: number): SeasonDetail {
        const content = Season.fromJson(json, seriesId);
        return new SeasonDetail({
            overview: json.overview,
            episodes: json.episodes? json.episodes.map((item: any) => Episode.fromJson(item)) : [],
            ...content
        })
    }
}