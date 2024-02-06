import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';
import { privateCall } from './generic';

const country = "AR" // Esto hay que cambiarlo


// --------- --------- --------- --------- --------- ---------
export function getMovie(
    session: ReturnType<typeof useSession>,
    movieId: string, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void
    ) {
    
    const endpoint = '/movies/' + movieId
    const params = { country: country }

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

    privateCall('GET', session, endpoint, queryParams, onSuccess, onFailure)

}

// --------- --------- --------- --------- --------- ---------
export function searchArtists(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando artistas...');

    // TODO: Implementar
    // const endpoint = '....'
    // const params = { country: country, ...... }

    // privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
export function searchUsers(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando usuarios...');

    // TODO: Implementar
    // const endpoint = '....'
    // const params = { country: country, ...... }

    // privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}