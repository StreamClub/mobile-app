import axios from 'axios';
import { AxiosResponse } from 'axios';

const baseURL = 'https://capi-xf6o.onrender.com' //REVISAR EL TEMA DE LA BASE URL
const country = "AR" //Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export function getMovie(movieId: string, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    axios.get(baseURL + '/movies/' + movieId, {params: {"country": country}}).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}

axios.defaults.baseURL = 'https://capi-xf6o.onrender.com'

// --------- --------- --------- --------- --------- ---------
export type QueryParamsBody = {
    query: string,
}

export function searchMovies(queryParams: QueryParamsBody, onSuccess: (response: AxiosResponse<any, any>) => void, onFailure: (error: any) => void) {
    const config = { 
        headers: {}, 
        params: queryParams,
    }

    axios.get(baseURL +'/movies/search', config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}