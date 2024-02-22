import { Platform } from "./Platforms";

export type Episode = {
    airDate: Date;
    episodeId?: number;
    name: string;
    overview?: string;
    runtime?: number;
    poster: string;
    platforms?: Array<Platform>
}