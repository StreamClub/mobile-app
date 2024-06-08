import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export const useGetUsersFriends = () => {
  const {privateCall, loading} = usePrivateCall();

  const getFriends = (queryText: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends';
    const params: Params = { params: {query: queryText} };
    privateCall('GET', endpoint, params, onSuccess);
  }

  return {getFriends, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useGetFriendsRequest = () => {
  const {privateCall, loading} = usePrivateCall();

  const getFriendsRequests = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends/requests';
    const params: Params = {};
    privateCall('GET', endpoint, params, onSuccess);
  }

  return {getFriendsRequests, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useSendFriendRequest = () => {
  const {privateCall, loading} = usePrivateCall();

  const sendRequest = (userId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends/requests/' + userId;
    const params: Params = {};
    privateCall('POST', endpoint, params, onSuccess);
  }

  return {sendRequest, loading}
}