import { AxiosResponse } from 'axios';
import { Params, usePrivateCall } from './generic';

// --------- --------- --------- --------- --------- ---------
export const useGetGroups = () => {
  const {privateCall, loading} = usePrivateCall();

  const getGroups = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/groups';
    const params: Params = { };
    privateCall('GET', endpoint, params, onSuccess);
  }

  return { getGroups }
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
