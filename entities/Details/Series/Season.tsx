export class Season {
    public id: number;
    public seriesId: number;
    public name: string;
    public poster: string;
    public airDate: string;
    public seen: boolean;

    constructor(season: Season) {
        this.id = season.id;
        this.seriesId = season.seriesId;
        this.name = season.name;
        this.poster = season.poster;
        this.airDate = season.airDate;
        this.seen = season.seen;
    }

    public static fromJson(json: any, seriesId: number): Season {
        return new Season({
            id: json.id,
            seriesId: seriesId,
            name: json.name,
            poster: json.poster,
            airDate: new Date(json.airDate).toISOString(),
            seen: json.seen as boolean,
        });
    }
}
