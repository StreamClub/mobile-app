import { ServiceEntry } from "./Services";
import { ContentType } from "./ContentType";

export type Reco = {
    id: number,
    title: string,
    poster: any,
    releaseDate: string,
    services: ServiceEntry[],
    genres: string[],
    duration: number,
    type: ContentType,
    inWatchlist: boolean,
}