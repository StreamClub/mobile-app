import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { Params, usePrivateCall } from './generic'

// --------- --------- --------- --------- --------- ---------
export type getSeenContentParams = {
    userId: number,
    page: number,
    pageSize: number,
}

export const useGetSeenContent = () => {
    const {privateCall, loading} = usePrivateCall();
    const getSeenContent = (queryParams: getSeenContentParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/seenContent/' + queryParams.userId
        const params: Params = { 
            params: {
                page: queryParams.page, 
                pageSize: queryParams.pageSize
            }
        }
        privateCall('GET', endpoint, params, onSuccess)
    }
    return {getSeenContent, loading}
}

/* export function getSeenContent(
    session: ReturnType<typeof useSession>,
    queryParams: getSeenContentParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/seenContent/' + queryParams.userId
    const params: Params = { 
        params: {
            page: queryParams.page, 
            pageSize: queryParams.pageSize
        }
    }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
} */

// --------- --------- --------- --------- --------- ---------
