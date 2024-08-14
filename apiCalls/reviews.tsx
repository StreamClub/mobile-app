import { AxiosResponse } from 'axios'
import { Params, usePrivateCall } from './generic'

// --------- --------- --------- --------- --------- ---------
export type updateReviewParams = {
  contentId: number,
  contentType: string,
  liked: boolean,
  review: string
}

export const useUpdateReview = () => {
  const {privateCall, loading} = usePrivateCall();

  const updateReview = (body: updateReviewParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/reviews';
    const params: Params = { data: body };
    privateCall('PUT', endpoint, params, onSuccess);
  }

  return {updateReview, loading};
}

// --------- --------- --------- --------- --------- ---------
export type deleteReviewParams = {
  contentId: number,
  contentType: string
}

export const useDeleteReview = () => {
  const {privateCall, loading} = usePrivateCall();

  const deleteReview = (body: deleteReviewParams, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/reviews';
    const params: Params = { data: body };
    privateCall('DELETE', endpoint, params, onSuccess);
  }

  return {deleteReview, loading};
}

// --------- --------- --------- --------- --------- ---------
export const useGetReviews = () => {
  const {privateCall, loading} = usePrivateCall();

  const getReviews = (contentId: string, contentType: 'movie' | 'series', 
    onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const endpoint = '/reviews/content/' + (contentType == 'movie'? 'movies' : 'series') + '/' + contentId;
    privateCall('GET', endpoint, {}, onSuccess);
  }

  return {getReviews, loading};
}
