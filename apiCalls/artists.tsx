import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';
import { useAppDispatch } from '../hooks/redux/useAppDispatch';
import { setLoading } from '../store/slices/searchContentSlice';

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
export const useSearchArtist = () => {
    const {privateCall, loading} = usePrivateCall();
    const dispatch = useAppDispatch();

    const searchArtists = (queryParams: SearchArtistParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/artists'
        const params: Params = { params: queryParams }
        dispatch(setLoading(true));
        privateCall('GET', endpoint, params, onSuccess);
        dispatch(setLoading(false));
    }

    return {searchArtists}
}
// --------- --------- --------- --------- --------- ---------
