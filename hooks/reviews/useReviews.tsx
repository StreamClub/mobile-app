import { AxiosResponse } from "axios";
import { useDeleteReview, useGetReviews, useUpdateReview } from "../../apiCalls/reviews"
import { Review } from "../../entities/Review";
import { useState } from "react";

export const useOnDeleteReviewPress = (contentId: string, contentType: string) => {
  const {deleteReview, loading} = useDeleteReview();

  const onPress = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const body = {
      contentId: +contentId,
      contentType: contentType
    }
    deleteReview(body, onSuccess);
  }

  return { onPress, loading }
}

export const useOnUpdateReviewPress = (contentId: string, contentType: string) => {
  const {updateReview, loading} = useUpdateReview();

  const onPress = (liked: boolean, review: string, onSuccess: (response: AxiosResponse<any, any>) => void) => {
    const body = {
      contentId: +contentId,
      contentType: contentType,
      liked: liked,
      review: review
    }
    updateReview(body, onSuccess);
  }

  return { onPress, loading }
}

export const useReviewsList = (contentId: string, contentType: 'movie' | 'series') => {
  const [reviews, setReviewState] = useState<Array<Review>>()
  const {getReviews, loading} = useGetReviews();

  const setReviews = (data: any) => {
    const reviewsData: Array<Review> = []
    console.log(data);
    data.map((review: any) => {
      console.log(review);
      reviewsData.push(Review.fromJson(review));
    })
    setReviewState(reviewsData);
  }

  const onSeeAllPress = (onSuccess: (response: AxiosResponse<any, any>) => void) => {
    console.log("on press");
    getReviews(contentId, contentType, onSuccess)
  }

  return {onSeeAllPress, reviews, setReviews, loading}
}
