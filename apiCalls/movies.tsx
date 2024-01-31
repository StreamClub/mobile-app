import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';

const baseURL = 'https://papi-4lms.onrender.com' //REVISAR EL TEMA DE LA BASE URL
const country = "AR" //TODO: Esto hay que cambiarlo

function getBaseConfig(session: ReturnType<typeof useSession>) {
    const accessToken = session?.accessToken
    return {
        headers: {"Authorization" : `Bearer ${accessToken}`},
        params: {},
    }
}

// --------- --------- --------- --------- --------- ---------
export function getMovie(
    session: ReturnType<typeof useSession>,
    movieId: string, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void
    ) {
    
    let config = getBaseConfig(session)
    config.params = {
        "country": country
    }
    
    axios.get(baseURL + '/movies/' + movieId, config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
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

    let config = getBaseConfig(session)
    config.params = queryParams


    axios.get(baseURL + '/movies/', config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
        });
}

// --------- --------- --------- --------- --------- ---------
export function searchSeries(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    let config = getBaseConfig(session)
    config.params = queryParams


    axios.get(baseURL + '/series/', config).then(
        (response) => {
            console.log(response);
            onSuccess(response)
        }, (error) => {
            onFailure(error)
        });
}

// --------- --------- --------- --------- --------- ---------
export function searchArtists(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando artistas...');
}

// --------- --------- --------- --------- --------- ---------
export function searchUsers(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando usuarios...');
}