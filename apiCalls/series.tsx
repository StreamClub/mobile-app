import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params, usePrivateCall } from './generic'

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
export const useGetSeries = () => {
    const {privateCall, loading} = usePrivateCall();

    const getSeries = (serieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/series/' + serieId
        const params: Params = { params: { country: country } }

        privateCall('GET', endpoint, params, onSuccess);
    }
    return {getSeries, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useGetSeason = () => {
    const {privateCall, loading} = usePrivateCall();

    const getSeason = (seriesId: string, seasonId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/series/' + seriesId + '/seasons/' + seasonId;
        const params: Params = { params: { country: country } };
        privateCall('GET', endpoint, params, onSuccess);
    }

    return {getSeason, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useSeriesWatchlist = () => {
    const {privateCall, loading} = usePrivateCall();

    const addSeriesToWatchlist = (seriesId: string, 
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const body = {
            contentId: seriesId,
            contentType: 'series',
        };
        const params: Params = { data: body };
        privateCall('PUT', '/watchlist', params, onSuccess);
    }

    const removeSeriesFromWatchlist = (seriesId: string,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const body = {
            contentId: seriesId,
            contentType: 'series',
        };
        const params: Params = { data: body };
        privateCall('DELETE', '/watchlist', params, onSuccess);
    }

    return {addSeriesToWatchlist, removeSeriesFromWatchlist, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useSeriesSeen = () => {
    const {privateCall, loading} = usePrivateCall();
    
    const markSeriesAsSeen = (seriesId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('PUT', '/seenContent/series/' + seriesId, {}, onSuccess);
    }

    const unmarkSeriesAsSeen = (seriesId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('DELETE', '/seenContent/series/' + seriesId, {}, onSuccess);
    }

    const markSeasonAsSeen = (seasonId: string, seriesId: string,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('PUT', '/seenContent/series/' + seriesId + '/seasons/' + seasonId, {}, onSuccess);
    }

    const unmarkSeasonAsSeen = (seasonId: string, seriesId: string,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('DELETE', '/seenContent/series/' + seriesId + '/seasons/' + seasonId, {}, onSuccess);
    }

    const markEpisodeAsSeen = (episodeId: string, seriesId: string, seasonId: string,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const url = '/seenContent/series/' + seriesId + '/seasons/' + seasonId + '/episodes/' + episodeId;
        privateCall('PUT', url, {}, onSuccess);
    }

    const unmarkEpisodeAsSeen = (episodeId: string, seriesId: string, seasonId: string,
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const url = '/seenContent/series/' + seriesId + '/seasons/' + seasonId + '/episodes/' + episodeId;
        privateCall('DELETE', url, {}, onSuccess);
    }

    return {markSeriesAsSeen, unmarkSeriesAsSeen, markSeasonAsSeen, unmarkSeasonAsSeen, 
        markEpisodeAsSeen, unmarkEpisodeAsSeen, loading};
}
