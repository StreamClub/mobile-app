import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params } from './generic'

const country = 'AR' //TODO: Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export type SearchParams = {
    query: string
    page: number
}

export function searchSeries(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/series/'
    const params: Params = { params: {...queryParams, country: country } }
    
    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export function getSerie(
    session: ReturnType<typeof useSession>,
    serieId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/series/' + serieId
    const params: Params = { params: { country: country } }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export function getSeason(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    seasonId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/series/' + seriesId + '/seasons/' + seasonId
    const params: Params = { params: { country: country } }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export function addSeriesToWatchlist(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const body = {
        contentId: seriesId,
        contentType: 'series',
    }
    const params: Params = { data: body }
    privateCall('PUT', session, '/watchlist', params, onSuccess, onFailure)
}

export function removeSeriesFromWatchlist(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const body = {
        contentId: seriesId,
        contentType: 'series',
    }
    const params: Params = { data: body }
    privateCall('DELETE', session, '/watchlist', params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export function markSeriesAsSeen(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) { 
    privateCall('PUT', session, '/seenContent/series/' + seriesId, {}, onSuccess, onFailure);
}

export function unmarkSeriesAsSeen(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    privateCall('DELETE', session, '/seenContent/series/' + seriesId, {}, onSuccess, onFailure);
}

// --------- --------- --------- --------- --------- ---------
export function markSeasonAsSeen(
    session: ReturnType<typeof useSession>,
    seasonId: string,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) { 
    privateCall('PUT', session, '/seenContent/series/' + seriesId + '/seasons/' + seasonId, {}, onSuccess, onFailure);
}

export function unmarkSeasonAsSeen(
    session: ReturnType<typeof useSession>,
    seasonId: string,
    seriesId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    privateCall('DELETE', session, '/seenContent/series/' + seriesId + '/seasons/' + seasonId, {}, onSuccess, onFailure);
}

// --------- --------- --------- --------- --------- ---------
export function markEpisodeAsSeen(
    session: ReturnType<typeof useSession>,
    episodeId: string,
    seriesId: string,
    seasonId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) { 
    const url = '/seenContent/series/' + seriesId + '/seasons/' + seasonId + '/episodes/' + episodeId;
    privateCall('PUT', session, url, {}, onSuccess, onFailure);
}

export function unmarkEpisodeAsSeen(
    session: ReturnType<typeof useSession>,
    episodeId: string,
    seriesId: string,
    seasonId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const url = '/seenContent/series/' + seriesId + '/seasons/' + seasonId + '/episodes/' + episodeId;
    privateCall('DELETE', session, url, {}, onSuccess, onFailure);
}
