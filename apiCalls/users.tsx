import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';
import { useAppDispatch } from '../hooks/redux/useAppDispatch';
import { setLoading } from '../store/slices/searchContentSlice';

// --------- --------- --------- --------- --------- ---------
export const useSearchUsers = () => {
    const {privateCall, loading} = usePrivateCall();
    const dispatch = useAppDispatch();

    const searchUsers = (queryText: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        console.log("En search users");
        const endpoint = '/users'
        const params: Params = { params: {query: queryText} }
        dispatch(setLoading(true));
        privateCall('GET', endpoint, params, onSuccess);
    }

    return {searchUsers}
}