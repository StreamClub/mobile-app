import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params, usePrivateCall } from './generic'
import { getRegion } from '../utils/regionManager'

// --------- --------- --------- --------- --------- ---------
export type deleteUserServiceParams = {
    providerId: number
}

export type putUserServiceParams = {
    providerId: number
}

export const useUserServices = () => {
    const {privateCall, loading} = usePrivateCall();
    const session = useSession();
    const userId = session?.userId;

    const getUserServices = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/streamProviders/' + userId
        const params: Params = { params: {country: getRegion()} }

        privateCall('GET', endpoint, params, onSuccess)
    }

    const deleteUserService = (queryParams: deleteUserServiceParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/streamProviders';
        const params: Params = { data: {providerId: queryParams.providerId} };
        privateCall('DELETE', endpoint, params, onSuccess);
    }

    const getAllServices = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/streamProviders'
        const params: Params = { params: {country: getRegion()} }
    
        privateCall('GET', endpoint, params, onSuccess)
    }

    const putUserService = (queryParams: putUserServiceParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/streamProviders';
        const params: Params = { data: {providerId: queryParams.providerId} };
        privateCall('PUT', endpoint, params, onSuccess);
    }

    return {getUserServices, deleteUserService, getAllServices, putUserService, loading};
}

