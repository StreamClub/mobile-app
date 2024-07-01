import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'

// --------- --------- --------- --------- --------- ---------
export const useGetWatchlist = (userId: number) => {
    const {privateCall, loading} = usePrivateCall();

    const getWatchlist = (page: number, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/watchlist/' + userId
        const params: Params = { params: { page, pageSize: 10 } };
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
export type patchDisplayNameParams = {
    displayName: string
}

export const usePatchDisplayName = () => {
    const {privateCall, loading} = usePrivateCall();

    const patchDisplayName = (queryParams: patchDisplayNameParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/users'
        const params: Params = { data: queryParams }
        privateCall('PATCH', endpoint, params, onSuccess)
    }
    return {patchDisplayName, loading};
}

// --------- --------- --------- --------- --------- ---------