import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { Params, usePrivateCall } from './generic'
import { getRegion } from '../utils/regionManager'

// --------- --------- --------- --------- --------- ---------
export type getRecosParams = {
}

export type putUserServiceParams = {
    providerId: number
}

export const useGetRecos = () => {
    const { privateCall } = usePrivateCall();

    // const getRecos = ( onSuccess: (response: AxiosResponse<any, any>) => void ) => {
    const getRecos = ( onSuccess: (response: any) => void ) => {
        // const endpoint = '/?????';
        // const params: Params = { data: {} };
        // privateCall( 'GET', endpoint, params, onSuccess );

        //codigo de prueba (borrar)
        onSuccess(1);
    }

    return { getRecos };
}
