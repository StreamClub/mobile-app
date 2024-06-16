import { ServiceEntry } from "./Services";
import { ContentType } from "./ContentType";

export type Reco = {
    poster: any,
    services: ServiceEntry[],
    genres: string[],
    duration: number,
    type: ContentType,
    inWatchlist: boolean,
}