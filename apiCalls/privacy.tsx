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