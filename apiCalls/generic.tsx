import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';

const baseURL = 'https://papi-4lms.onrender.com' //REVISAR EL TEMA DE LA BASE URL

// From Axios Documentation:

//    `data` is the data to be sent as the request body
//     Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'

//    `params` are the URL parameters to be sent with the request
//     Must be a plain object or a URLSearchParams object
export type Params = {
    params?: any | {},
    data?: any | {}
}

// Use for calls that require a token
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


// Use for calls that do not require a token
export function publicCall(
    method: string,
    session: ReturnType<typeof useSession>,
    endpoint: string,
    paramsAndData: Params,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    axios({
        method: method,
        url: baseURL + endpoint,
        responseType: 'json',
        params: paramsAndData.params,
        data: paramsAndData.data
    })
        .then(
            (response) => {
                onSuccess(response)
            }, (error) => {
                onFailure(error)
            });
}