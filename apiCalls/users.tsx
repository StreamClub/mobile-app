import { AxiosResponse } from 'axios';
import { useSession } from '../context/ctx';

const country = "AR" // TODO: Esto hay que cambiarlo

// --------- --------- --------- --------- --------- ---------
export type SearchUserParams = {
    query: string,
    page: number,
}

export function searchUsers(
    session: ReturnType<typeof useSession>,
    queryParams: SearchUserParams,
    onSuccess: (response: AxiosResponse<any, any>) => void,
    onFailure: (error: any) => void) {

    console.log('[TODO] Buscando usuarios...');

    // TODO: Implementar
    // const endpoint = '....'
    // const params: Params = { params: { country: country, ...... } }

    // privateCall('GET', session, endpoint, params, onSuccess, onFailure)
}