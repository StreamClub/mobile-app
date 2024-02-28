import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { privateCall, Params } from './generic'

// --------- --------- --------- --------- --------- ---------
export type getWatchlistParams = {
    userId: number
}

export function getWatchlist(
    session: ReturnType<typeof useSession>,
    queryParams: getWatchlistParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/watchlist/' + queryParams.userId
    const params: Params = { }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------