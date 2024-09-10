import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';

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
export const useCreateGroup = () => {
  const {privateCall, loading} = usePrivateCall();

  const createGroup = (name: string, members: number[], onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/groups';
    const params: Params = { data: {name, members} };
    privateCall('POST', endpoint, params, onSuccess);
  }

  return { createGroup }
}

// --------- --------- --------- --------- --------- ---------
// export const useRemoveFriend = () => {
//   const {privateCall, loading} = usePrivateCall();

//   const removeFriend = (userId: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
//     const endpoint = '/friends/' + userId;
//     const params: Params = {};
//     privateCall('DELETE', endpoint, params, onSuccess);
//   }

//   return {removeFriend, loading}
// }
