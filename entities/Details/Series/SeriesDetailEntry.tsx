import { Review } from '../../Review'
import { ContentDetail } from '../ContentDetailEntry'
import { Episode } from './Episode'
import { Season } from './Season'

export class SeriesDetail extends ContentDetail {
    public createdBy: string[]
    public lastAirDate: string
    public totalEpisodes: number
    public totalSeasons: number
    public seasons: Season[]
    public nextEpisode: Episode | null
    public userReview: Review | null

    constructor(series: SeriesDetail) {
        super(series)
        this.createdBy = series.createdBy
        this.lastAirDate = series.lastAirDate
        this.totalEpisodes = series.totalEpisodes
        this.seasons = series.seasons
        this.totalSeasons = series.totalSeasons
        this.nextEpisode = series.nextEpisode
        this.userReview = series.userReview
    }

    public static fromJson(json: any): SeriesDetail {
        const content = ContentDetail.fromJson(json)
        return new SeriesDetail({
            createdBy: json.createdBy,
            lastAirDate: json.lastAirDate,
            totalEpisodes: json.numberOfEpisodes,
            totalSeasons: json.numberOfSeasons,
            seasons: json.seasons.map((item: any) =>
                Season.fromJson(item, json.id)
            ),
            nextEpisode: json.nextEpisode
                ? Episode.fromJson(json.nextEpisode)
                : null,
            userReview: json.userReview ? Review.fromJson(json.userReview) : null,
            ...content,
        })
    }
}
