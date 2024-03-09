import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';
import { privateCall, Params, usePrivateCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export const useGetArtist = () => {
    const {privateCall, loading} = usePrivateCall();
    const getArtist = (artistId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/artists/' + artistId
        const params: Params = { }

        privateCall('GET', endpoint, params, onSuccess)
    }
    return {getArtist, loading};
}

// --------- --------- --------- --------- --------- ---------
export type SearchArtistParams = {
    query: string,
    page: number,
}

export function searchArtists(
    session: ReturnType<typeof useSession>,
    queryParams: SearchArtistParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    const endpoint = '/artists'
    const params: Params = { params: queryParams }

    privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}

// --------- --------- --------- --------- --------- ---------
