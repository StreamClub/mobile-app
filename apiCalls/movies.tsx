import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'

const country = 'AR' // TODO: Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export const useGetMovie = () => {
    const {loading, privateCall} = usePrivateCall();

    const getMovie = (movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/movies/' + movieId;
        const params: Params = { params: { country: country } };
        privateCall('GET', endpoint, params, onSuccess);
    }

    return {loading, getMovie};
}

// --------- --------- --------- --------- --------- ---------
export type SearchParams = {
    query: string
    page: number
}

export const useSearchMovies = () => {
    const {loading, privateCall} = usePrivateCall();
    const endpoint = '/movies/';
    
    const searchMovies = (queryParams: SearchParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { params: {...queryParams, country: country } }
        privateCall('GET', endpoint, params, onSuccess);
    }

    return {loading, searchMovies};
}

// --------- --------- --------- --------- --------- ---------
export const useMovieWatchlist = () => {
    const {loading, privateCall} = usePrivateCall();

    const addMovieToWatchlist = (movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const body = {
            contentId: movieId,
            contentType: 'movie',
        }
        const params: Params = { data: body }
        
        privateCall('PUT', '/watchlist', params, onSuccess);
    }
    
    const removeMovieFromWatchlist = (movieId: string, 
        onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const body = {
            contentId: movieId,
            contentType: 'movie',
        };
        const params: Params = { data: body };
        privateCall('DELETE', '/watchlist', params, onSuccess);
    }

    return {loading, addMovieToWatchlist, removeMovieFromWatchlist};
}

// --------- --------- --------- --------- --------- ---------
export const useMovieSeen = () => {
    const {privateCall, loading} = usePrivateCall();

    const markMovieAsSeen = (movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('PUT', '/seenContent/movies/' + movieId, {}, onSuccess);
    }

    const unmarkMovieAsSeen = (movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        privateCall('DELETE', '/seenContent/movies/' + movieId, {}, onSuccess);
    }

    return {markMovieAsSeen, unmarkMovieAsSeen, loading};
}
