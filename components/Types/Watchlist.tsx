import { ContentType } from './ContentType';

export type WatchlistEntry = {
    createdAt: string;
    id: number;
    poster: string;
    contentType: ContentType;
    title: string;
}