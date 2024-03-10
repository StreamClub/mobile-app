import { EpisodeNumber } from "./EpisodeNumber";

export type SeenContentEntry = {
    contentType: string,
    id: number,
    poster: string,
    updatedAt: string,
    hasReview: Boolean,
    liked: Boolean,
    totalWatchedEpisodes?: number,
    lastSeenEpisode?: EpisodeNumber,
    seen?: number,
}