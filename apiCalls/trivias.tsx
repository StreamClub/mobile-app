import { AxiosResponse } from "axios";
import { usePrivateCall } from "./generic";

export const useGetAllTrivias = () => {
  const {privateCall, loading} = usePrivateCall();

  const getAllTrivias = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
      console.log("Buscando trivias");
      privateCall('GET', '/trivias', {}, onSuccess);
  }

  return {getAllTrivias, loading};
}