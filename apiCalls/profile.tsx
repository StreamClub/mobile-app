import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { Params, usePrivateCall } from './generic'

// --------- --------- --------- --------- --------- ---------
export const useGetWatchlist = () => {
    const {privateCall, loading} = usePrivateCall();
    const session = useSession();
    const userId = session?.userId;

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

export function getProfile(
    session: ReturnType<typeof useSession>,
    queryParams: getProfileParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void
) {
    const endpoint = '/users/' + queryParams.userId
    const params: Params = { }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------