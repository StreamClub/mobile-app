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
export type SearchParams = {
    query: string,
    page: number,
}

export function searchSeries(
    session: ReturnType<typeof useSession>,
    queryParams: SearchParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    let config = getBaseConfig(session)
    config.params = queryParams


    axios.get(baseURL + '/series/', config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
        });
}

// --------- --------- --------- --------- --------- ---------
export function getSerie(
    session: ReturnType<typeof useSession>,
    serieId: string, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void
    ) {
    
    let config = getBaseConfig(session)
    config.params = {
        "country": country
    }
    
    axios.get(baseURL + '/series/' + serieId, config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}

// --------- --------- --------- --------- --------- ---------
export function getSeason(
    session: ReturnType<typeof useSession>,
    seriesId: string,
    seasonId: string, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void
    ) {
    
    let config = getBaseConfig(session)
    config.params = {
        "country": country
    }
    
    axios.get(baseURL + '/series/' + seriesId + '/seasons/' + seasonId, config).then(
        (response) => {
            onSuccess(response)
        }, (error) => {
            onFailure(error)
    });
}
