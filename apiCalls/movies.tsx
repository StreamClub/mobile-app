import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'
import { useAppDispatch } from '../hooks/redux/useAppDispatch';
import { setLoading } from '../store/slices/searchContentSlice';

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
export const useGetSimilarMovies = () => {
    const {privateCall, loading} = usePrivateCall();

    const getSimilarMovies = (movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/movies/' + movieId + '/recommendations';
        const params: Params = { params: { country: country } };
        privateCall('GET', endpoint, params, onSuccess);
    }

    return {getSimilarMovies, loading};
}

// --------- --------- --------- --------- --------- ---------
export type SearchParams = {
    query: string
    page: number
}

export const useSearchMovies = () => {
    const {privateCall} = usePrivateCall();
    const endpoint = '/movies/';
    const dispatch = useAppDispatch();
    
    const searchMovies = (queryParams: SearchParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { params: {...queryParams, country: country } }
        dispatch(setLoading(true));
        privateCall('GET', endpoint, params, onSuccess);
        //TODO: AGREGAR LOGICA EN BASE A SHOWERROR PARA QUE SETEE EL PAYLOAD DE REDUX DE LA BUSQUEDA
        //EN VACIO (O SEA UN ARRAY VACIO) < eso tan simple no es, asi no funciono hay q revisar.
    }

    return {searchMovies};
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

// --------- --------- --------- --------- --------- ---------
export type DiscoverParams = {
    genderIds?: string,
    page: number,
    country: string,
    runtimeLte?: number,
    runtimeGte?: number,
    inMyPlatforms?: boolean
}

export const useDiscoverMovie = () => {
    const {privateCall, loading} = usePrivateCall();

    const discoverMovie = (filters: DiscoverParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const params: Params = { params: {...filters } };
        privateCall('GET', '/movies/discover', params, onSuccess);
    }

    return {discoverMovie, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useSimilarMovies = () => {
    const {privateCall, loading} = usePrivateCall();

    const similarMovies = (selectedContent: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        console.log("About to get similar movies");
        console.log(selectedContent);
        const params: Params = { params: {movieIds: selectedContent} };
        privateCall('GET', '/movies/similar', params, onSuccess);
    }

    return {similarMovies, loading};
}

