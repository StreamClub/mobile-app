import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';
import config from '../config.json';

const baseURL = config.api.baseUrl
const tokenExpiredErrorMessage = "Invalid auth token"
const tokenExpiredStatusCode = 401

// --------- --------- --------- --------- --------- ---------
// From Axios Documentation:
//    `data` is the data to be sent as the request body
//     Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'

//    `params` are the URL parameters to be sent with the request
//     Must be a plain object or a URLSearchParams object

// Observation: `params` is applicable for all request methods, but usually required just for 'GET' requests
export type Params = {
    params?: any | {},
    data?: any | {}
}
// --------- --------- --------- --------- --------- ---------

function onSuccessRefresh (privateCallParams: any, response: AxiosResponse<any, any>) {
    const signIn = privateCallParams.session?.signIn
    const accessToken = response.data.token
    const refreshToken = response.data.refreshToken
    
    console.log('Token refreshed')
    console.log('New access token: ' + accessToken)
    console.log('New refresh token: ' + refreshToken)

    signIn?.(accessToken, refreshToken)

    privateCall(
        privateCallParams.method,
        privateCallParams.session,
        privateCallParams.endpoint,
        privateCallParams.paramsAndData,
        privateCallParams.onSuccess,
        privateCallParams.onFailure,
        accessToken
    )
}

function refreshTokens(privateCallParams: any){
    const refreshToken = privateCallParams.session?.refreshToken
    const data = { refreshToken }
    const endpoint = '/auth/refreshCredentials'

    axios({
        method: 'POST',
        url: baseURL + endpoint,
        responseType: 'json',
        data: data
    })
        .then(
            (response) => {
                onSuccessRefresh(privateCallParams, response)
            }, (error) => {
                // TODO: Acá se implementaría la logica de Refresh token vencido (o bien podemos definir usar refresh tokens sin vencimiento)
                privateCallParams.onFailure(error)
            });
}


function expiredToken(response: any) {
    return response.status === tokenExpiredStatusCode && response.data.error === tokenExpiredErrorMessage
}

function handlePrivateCallError(
    error: any,
    privateCallParams: any,
) {
    if (expiredToken(error.response)) {
        refreshTokens(privateCallParams)
    } else {
        privateCallParams.onFailure(error)
    }
}

// Use for calls that require a token
export function privateCall(
    method: string,
    session: ReturnType<typeof useSession>,
    endpoint: string,
    paramsAndData: Params,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void,
    newAccessToken?: string
) {
    const accessToken = session?.accessToken
    axios({
        method: method,
        url: baseURL + endpoint,
        responseType: 'json',
        headers: { "Authorization": `Bearer ${newAccessToken || accessToken}`},
        params: paramsAndData.params,
        data: paramsAndData.data
    })
        .then(
            (response) => {
                onSuccess(response)
            }, (error) => {
                const privateCallParams = { method, session, endpoint, paramsAndData, onSuccess, onFailure }
                handlePrivateCallError(error, privateCallParams)
            });
}


// Use for calls that do not require a token
export function publicCall(
    method: string,
    //TODO: Eliminar session
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