import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';
import config from '../config.json';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useState } from 'react';

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
export const usePrivateCall = () => {
    const {setError} = useErrorHandler()
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;

    const expiredToken = (response: any) => {
        return response.status === tokenExpiredStatusCode && response.data.error === tokenExpiredErrorMessage
    }

    const onSuccessRefresh = (privateCallParams: any, response: AxiosResponse<any, any>)  => {
        const signIn = session?.signIn
        const accessToken = response.data.token
        const refreshToken = response.data.refreshToken
        
        console.log('[Success Refresh]')
        console.log('New access token: ' + accessToken)
        console.log('New refresh token: ' + refreshToken)
    
        signIn?.(accessToken, refreshToken)

        privateCall(
            privateCallParams.method,
            privateCallParams.endpoint,
            privateCallParams.paramsAndData,
            privateCallParams.onSuccess,
            privateCallParams.onFailure,
            accessToken
        )
    }
    
    const refreshTokens = (privateCallParams: any) => {
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
                    session?.signOut()
                    setError(error);
                });
    }

    const handlePrivateCallError = (
        error: any,
        privateCallParams: any,
    ) => {
        if (expiredToken(error.response)) {
            refreshTokens(privateCallParams)
        } else {
            if (privateCallParams.onFailure){
                privateCallParams.onFailure(error)
            } else {
                setError(error);
            }
        }
    }
   
    const privateCall = (method: string, endpoint: string, paramsAndData: Params, 
        onSuccess: (response: AxiosResponse<any, any>) => void,
        onFailure?: (error: any) => void, newAccessToken?: string) => {
            setLoading(true);
            axios({
                method: method,
                url: baseURL + endpoint,
                responseType: 'json',
                headers: { "Authorization": `Bearer ${newAccessToken || accessToken}`},
                params: paramsAndData.params,
                data: paramsAndData.data
            }).then(
                (response) => {
                    onSuccess(response);
                }, (error) => {
                    console.log(error.response.data);
                    const privateCallParams = { method, endpoint, paramsAndData, onSuccess, onFailure };
                    handlePrivateCallError(error, privateCallParams);
                }).finally(() => {
                    setLoading(false);
                });
    }

    return { loading, privateCall };
}

// Use for calls that do not require a token
export const usePublicCall = () => {
    const {setError} = useErrorHandler()
    const [loading, setLoading] = useState(false);
    
    const publicCall = (method: string, endpoint: string, paramsAndData: Params, 
        onSuccess: (response: AxiosResponse<any, any>) => void,
        onFailure?: (error: any) => void) => {
            setLoading(true);
            axios({
                method: method,
                url: baseURL + endpoint,
                responseType: 'json',
                params: paramsAndData.params,
                data: paramsAndData.data
            })
                .then(
                    (response) => {
                        onSuccess(response);
                    }, (error) => {
                        if (onFailure){
                            onFailure(error);
                        } else {
                            setError(error);
                        }
                    }).finally(() => {
                        setLoading(false);
                    });
    }
    return { loading, publicCall };
}