import { CastMember } from './CastMember'
import { Content } from '../Content'
import { Platform } from './Platform'
import { SimilarContent } from './SimilarContent'

export class ContentDetail extends Content {
    public genres: string[]
    public status: string
    public releaseDate: Date
    public platforms: Platform[]
    public backdrop: string
    public overview: string
    public cast: CastMember[]
    public similar: SimilarContent[]
    public inWatchlist: boolean

    constructor(contentDetail: ContentDetail) {
        super(contentDetail)
        this.status = contentDetail.status
        this.overview = contentDetail.overview
        this.backdrop = contentDetail.backdrop
        this.genres = contentDetail.genres
        this.cast = contentDetail.cast
        this.platforms = contentDetail.platforms
        this.releaseDate = contentDetail.releaseDate
        this.similar = contentDetail.similar
        this.inWatchlist = contentDetail.inWatchlist
    }

    public static fromJson(json: any): ContentDetail {
        const content = Content.fromJson(json)
        return new ContentDetail({
            status: json.status,
            overview: json.overview,
            backdrop: json.backdrop,
            genres: json.genres,
            cast: json.cast.map((item: any) => CastMember.fromJson(item)),
            platforms: json.platforms.map((item: any) =>
                Platform.fromJson(item)
            ),
            releaseDate: new Date(json.releaseDate),
            similar: json.similar.map((item: any) =>
                SimilarContent.fromJson(item)
            ),
            inWatchlist: json.inWatchlist,
            ...content,
        })
    }
}
