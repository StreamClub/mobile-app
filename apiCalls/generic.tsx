import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';

const baseURL = 'https://papi-4lms.onrender.com' //REVISAR EL TEMA DE LA BASE URL

export function privateCall(
    method: string,
    session: ReturnType<typeof useSession>,
    endpoint: string,
    params: any,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const accessToken = session?.accessToken
    axios({
        method: method,
        url: baseURL + endpoint,
        responseType: 'json',
        headers: { "Authorization": `Bearer ${accessToken}`},
        params: params,
    })
        .then(
            (response) => {
                onSuccess(response)
            }, (error) => {
                onFailure(error)
            });
}

export function publicCall(
    method: string, 
    url: string, 
    config: any, 
    onSuccess: (response: AxiosResponse<any, any>) => void, 
    onFailure: (error: any) => void) {
    
}