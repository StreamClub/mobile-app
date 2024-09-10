import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'

const country = 'AR' // TODO: Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export type getRecosParams = {
}

export type putUserServiceParams = {
    providerId: number
}

export const useGetMovieRecos = () => {
    const { privateCall } = usePrivateCall();

    const getMovieRecos = ( onSuccess: (response: AxiosResponse<any, any>) => void ) => {
        const endpoint = '/users/recommendations/movies';
        const params: Params = { params: { country: country } };
        privateCall( 'GET', endpoint, params, onSuccess );
    }

    return { getMovieRecos };
}

export const useGetSeriesRecos = () => {
    const { privateCall } = usePrivateCall();

    const getSeriesRecos = ( onSuccess: (response: AxiosResponse<any, any>) => void ) => {
        const endpoint = '/users/recommendations/series';
        const params: Params = { params: { country: country } };
        privateCall( 'GET', endpoint, params, onSuccess );
    }

    return { getSeriesRecos };
}

export const useGetMoviesSeenByFriends = () => {
    const { privateCall } = usePrivateCall();

    const getMoviesSeenByFriends = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/movies/recommendations';
        const params: Params = { }


        privateCall('GET', endpoint, params, onSuccess);
    }

    return { getMoviesSeenByFriends }
}
