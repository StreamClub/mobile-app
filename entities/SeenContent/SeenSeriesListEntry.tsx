import { Content } from '../Content'
import { SeenContentListEntry } from './SeenContentListEntry'
import { EpisodeNumber } from '../../components/Types/EpisodeNumber'

export class SeenSeriesListEntry extends SeenContentListEntry {
    public totalWatchedEpisodes: number
    public lastSeenEpisode: EpisodeNumber
    public seen: Number

    constructor(seenSeries: SeenSeriesListEntry) {
        super(seenSeries)
        this.totalWatchedEpisodes = seenSeries.totalWatchedEpisodes
        this.lastSeenEpisode = seenSeries.lastSeenEpisode
        this.seen = seenSeries.seen
    }

    public static fromJson(json: any): SeenSeriesListEntry {
        const seenSeries = SeenContentListEntry.fromJson(json)
        return new SeenSeriesListEntry({
            totalWatchedEpisodes: json.totalWatchedEpisodes,
            lastSeenEpisode: json.lastSeenEpisode,
            seen: json.seen,
            ...seenSeries,
        })
    }

    public static serialize(seenSeriesEntry: SeenSeriesListEntry): any {
        return {
            ...super.serialize(seenSeriesEntry),
            totalWatchedEpisodes: seenSeriesEntry.totalWatchedEpisodes,
            lastSeenEpisode: seenSeriesEntry.lastSeenEpisode,
            seen: seenSeriesEntry.seen,
        }
    }
}
