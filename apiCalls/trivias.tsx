import { AxiosResponse } from "axios";
import { usePrivateCall } from "./generic";

export const useGetAllTrivias = () => {
  const {privateCall, loading} = usePrivateCall();

  const getAllTrivias = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
      privateCall('GET', '/trivias', {}, onSuccess);
  }

  return {getAllTrivias, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useGetTrivia = () => {
  const {privateCall, loading} = usePrivateCall();

  const getTrivia = (contentType: string, contentId: string,  onSuccess: (response: AxiosResponse<any, any>) => void) => {
      const endpoint = '/trivias/' + contentType + '/' + contentId;
      privateCall('GET', endpoint, {}, onSuccess);
  }

  return {getTrivia, loading};
}
