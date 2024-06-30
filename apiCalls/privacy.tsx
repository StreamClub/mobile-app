import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export const useGetUsersPrivacy = () => {
  const {privateCall, loading} = usePrivateCall();

  const getUsersPrivacy = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/privacy';
    const params: Params = { };
    privateCall('GET', endpoint, params, onSuccess);
  }

  return {getUsersPrivacy, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useUpdateWatchlistPrivacy = () => {
  const {privateCall, loading} = usePrivateCall();

  const updateWatchlistPrivacy = (isPrivate: boolean, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/privacy/watchlist';
    const params: Params = { data: {isWatchlistPrivate: isPrivate} };
    privateCall('PATCH', endpoint, params, onSuccess);
  }

  return {updateWatchlistPrivacy, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useUpdateSeenContentPrivacy = () => {
  const {privateCall, loading} = usePrivateCall();

  const updateSeenContentPrivacy = (isPrivate: boolean, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/privacy/seenContent';
    const params: Params = { data: {isSeenContentListPrivate: isPrivate} };
    privateCall('PATCH', endpoint, params, onSuccess);
  }

  return {updateSeenContentPrivacy, loading}
}
