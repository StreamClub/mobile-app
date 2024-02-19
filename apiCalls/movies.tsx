import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';
import { privateCall, Params } from './generic';

const country = "AR" // TODO: Esto hay que cambiarlo


// --------- --------- --------- --------- --------- ---------
export function getMovie(
    session: ReturnType<typeof useSession>,
    movieId: string, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void
    ) {
    
    const endpoint = '/movies/' + movieId
    const params: Params = { params: {country: country} }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export type SearchParams = {
    query: string,
    page: number,
}

export function searchMovies(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    const endpoint = '/movies/'
    const params: Params = { params: queryParams }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)

}

// --------- --------- --------- --------- --------- ---------
export function addMovieToWatchlist(
    session: ReturnType<typeof useSession>,
    movieId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {
    const body = {
        "contentId": movieId,
        "contentType": "MOVIE"
    }
    const params: Params = { data: body }
    privateCall('PUT', session, '/watchlist', params, onSuccess, onFailure);
}

export function removeMovieFromWatchlist(
    session: ReturnType<typeof useSession>,
    movieId: string,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {
    const body = {
        "contentId": movieId,
        "contentType": "MOVIE"
    }
    const params: Params = { data: body }
    privateCall('DELETE', session, '/watchlist', params, onSuccess, onFailure);
}
