import { ContentEntry } from "./ContentListEntry"

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
}
