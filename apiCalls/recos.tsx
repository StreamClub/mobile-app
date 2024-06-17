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
