import { CastMember } from "./CastMember";
import { Platform } from "./Platform";
import { SimilarContent } from "./SimilarContent";

export class ContentDetail {
    public id: string;
    public title: string;
    public genres: string[];
    public poster: string;
    public releaseDate: Date;
    public platforms: Platform[];
    public backdrop: string;
    public overview: string;
    public cast: CastMember[];
    public similar: SimilarContent[];
    public seen: number;
    public inWatchlist: boolean;

    constructor(contentDetail: ContentDetail) {
        this.id = contentDetail.id;
        this.overview = contentDetail.overview;
        this.poster = contentDetail.poster;
        this.backdrop = contentDetail.backdrop;
        this.genres = contentDetail.genres;
        this.cast = contentDetail.cast;
        this.platforms = contentDetail.platforms;
        this.title = contentDetail.title;
        this.releaseDate = contentDetail.releaseDate;
        this.similar = contentDetail.similar;
        this.seen = contentDetail.seen;
        this.inWatchlist = contentDetail.inWatchlist;
    }

    public static fromJson(json: any): ContentDetail {
        return new ContentDetail({
            id: json.id.toString(),
            overview: json.overview,
            poster: json.poster,
            backdrop: json.backdrop,
            genres: json.genres,
            cast: json.cast.map((item: any) => CastMember.fromJson(item)),
            platforms: json.platforms.map((item: any) => Platform.fromJson(item)),
            title: json.title,
            releaseDate: new Date(json.releaseDate),
            similar: json.similar.map((item: any) => SimilarContent.fromJson(item)),
            seen: json.seen,
            inWatchlist: json.inWatchlist,
        });
    }
}
