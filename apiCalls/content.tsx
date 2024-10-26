import { AxiosResponse } from 'axios'
import { useSession } from '../context/ctx'
import { Params, usePrivateCall } from './generic'
import { ContentType } from '../components/Types/ContentType'

// --------- --------- --------- --------- --------- ---------
export type getSeenContentParams = {
    userId: number,
    page: number,
    pageSize: number,
    contentTypes?: 'movie' | 'series'
}

export const useGetSeenContent = () => {
    const {privateCall, loading} = usePrivateCall();
    const getSeenContent = (queryParams: getSeenContentParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        const endpoint = '/seenContent/' + queryParams.userId
        const params: Params = { 
            params: {
                page: queryParams.page, 
                pageSize: queryParams.pageSize,
                contentTypes: queryParams.contentTypes? queryParams.contentTypes : 'movie,series'
            }
        }
        privateCall('GET', endpoint, params, onSuccess)
    }
    return {getSeenContent, loading}
}

// --------- --------- --------- --------- --------- ---------
export type getCreditsParams = {
    contentId: string,
    contentType: ContentType,
}

var matchingContentType: { [key in ContentType]: string } = {
    [ContentType.Movie]: "/movies", 
    [ContentType.Series]: "/series"
}
export const useGetCredits = () => {
    const {privateCall, loading} = usePrivateCall();
    
    const getCredits = (queryParams: getCreditsParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
        if (!(queryParams.contentType in matchingContentType)) {
            throw new Error("Tipo de contenido inválido: " + queryParams.contentType);
        }
        const endpoint = matchingContentType[queryParams.contentType] + '/' + queryParams.contentId + '/credits'

        const params: Params = { }
        privateCall('GET', endpoint, params, onSuccess)
    }
    return {getCredits, loading}
}