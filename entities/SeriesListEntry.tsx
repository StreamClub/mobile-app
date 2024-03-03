import { ContentEntry } from './ContentListEntry'

export class SeriesEntry extends ContentEntry {
    public releaseYear: string
    public lastYear: string
    public status: string

    constructor(serie: SeriesEntry) {
        super(serie)
        this.releaseYear = serie.releaseYear
        this.lastYear = serie.lastYear
        this.status = serie.status
    }

    public static fromJson(serie: any): SeriesEntry {
        const content = ContentEntry.fromJson(serie)
        return new SeriesEntry({
            releaseYear: serie.releaseDate
                ? serie.releaseDate.split('-')[0]
                : '?',
            status: serie.status,
            lastYear: serie.lastEpisodeReleaseDate
                ? serie.lastEpisodeReleaseDate.split('-')[0]
                : '?',
            ...content,
        })
    }

    public static serialize(serie: SeriesEntry): any {
        return {
            ...ContentEntry.serialize(serie),
            releaseYear: serie.releaseYear,
            lastYear: serie.lastYear,
            status: serie.status,
        }
    }
}
