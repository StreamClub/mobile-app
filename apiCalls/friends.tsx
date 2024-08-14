import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export const useGetUsersFriends = () => {
  const {privateCall, loading} = usePrivateCall();

  const getFriends = (page:number, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends';
    const params: Params = { params: {page, pageSize: 20} };
    privateCall('GET', endpoint, params, onSuccess);
  }

  return {getFriends, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useGetFriendsRequest = () => {
  const {privateCall, loading} = usePrivateCall();

  const getFriendsRequests = (page: number, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends/requests';
    const params: Params = { params: {page, pageSize: 20} };
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

// --------- --------- --------- --------- --------- ---------
export const useRemoveFriendRequest = () => {
  const {privateCall, loading} = usePrivateCall();

  const removeRequest = (requestId: string, accept: boolean, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends/requests/' + requestId;
    const params: Params = {data: {action: accept? 'ACCEPT' : 'REMOVE'}};
    privateCall('DELETE', endpoint, params, onSuccess);
  }

  return {removeRequest, loading}
}

// --------- --------- --------- --------- --------- ---------
export const useRemoveFriend = () => {
  const {privateCall, loading} = usePrivateCall();

  const removeFriend = (userId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/friends/' + userId;
    const params: Params = {};
    privateCall('DELETE', endpoint, params, onSuccess);
  }

  return {removeFriend, loading}
}