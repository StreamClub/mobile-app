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
export type SearchArtistParams = {
    query: string,
    page: number,
}

export function searchArtists(
    session: ReturnType<typeof useSession>,
    queryParams: SearchArtistParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando artistas...');

    const endpoint = '/artists'
    const params: Params = { params: queryParams }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
