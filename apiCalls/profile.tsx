import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'

// --------- --------- --------- --------- --------- ---------
export const useGetWatchlist = (userId: number) => {
    const {privateCall, loading} = usePrivateCall();

    const getWatchlist = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/watchlist/' + userId
        const params: Params = { };
        privateCall('GET', endpoint, params, onSuccess);
    }
    return {getWatchlist, loading};
}

// --------- --------- --------- --------- --------- ---------
export type getProfileParams = {
    userId: number
}

export const useGetProfile = () => {
    const {privateCall, loading} = usePrivateCall();

    const getProfile = (queryParams: getProfileParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/users/' + queryParams.userId
        const params: Params = { }
        privateCall('GET', endpoint, params, onSuccess)
    }
    return {getProfile, loading};
}

// --------- --------- --------- --------- --------- ---------
export type patchProfileParams = {
    displayName?: string,
    photoId?: number
}

export const usePatchProfile = () => {
    const {privateCall, loading} = usePrivateCall();

    const patchProfile = (queryParams: patchProfileParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/users'
        const params: Params = { data: queryParams }
        privateCall('PATCH', endpoint, params, onSuccess)
    }
    return {patchProfile, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useGetProfilePhotos = () => {
    const {privateCall, loading} = usePrivateCall();

    const getProfilePhotos = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/users/photos';
        const params: Params = { };
        privateCall('GET', endpoint, params, onSuccess);
    }
    return {getProfilePhotos, loading};
}
