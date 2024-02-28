import { ContentType } from './ContentType';

export type WatchlistEntry = {
    createdAt: string;
    contentId: number;
    poster: string;
    contentType: ContentType;
}