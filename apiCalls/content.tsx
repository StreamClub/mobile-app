import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params } from './generic'

// --------- --------- --------- --------- --------- ---------
export type getSeenContentParams = {
    userId: number,
    page: number,
    pageSize: number,
}

export function getSeenContent(
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
}

// --------- --------- --------- --------- --------- ---------
