import { ServiceEntry } from "./Services";
import { ContentType } from "./ContentType";

export type Reco = {
    id: number,
    title: string,
    poster: any,
    releaseDate: string,
    genres: string[],
    duration: number,
    type: ContentType,
    inWatchlist: boolean,
}