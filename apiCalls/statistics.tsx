import { AxiosResponse } from "axios";
import { Params, usePrivateCall } from "./generic";

// --------- --------- --------- --------- --------- ---------
export const useGetStatistics = () => {
  const {privateCall, loading} = usePrivateCall();

  const getStatistics = (month: string,  onSuccess: (response: AxiosResponse<any, any>) => void) => {
      const endpoint = '/streamProviders/stats';
      const params: Params = { params: { months: month } };
      privateCall('GET', endpoint, params, onSuccess);
  }

  return {getStatistics, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useGetSubscribeRecommendations = () => {
  const {privateCall, loading} = usePrivateCall();

  const getSubscribeRecommendations = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
      const endpoint = '/streamProviders/subscribeRecommendations';
      privateCall('GET', endpoint, {}, onSuccess);
  }

  return {getSubscribeRecommendations, loading};
}
