import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params } from './generic'
import { getRegion } from '../utils/regionManager'

// --------- --------- --------- --------- --------- ---------
export type getUserServicesParams = {
    userId: number
}

export function getUserServices(
    session: ReturnType<typeof useSession>,
    queryParams: getUserServicesParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/streamProviders/' + queryParams.userId
    const params: Params = { params: {country: getRegion()} }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------