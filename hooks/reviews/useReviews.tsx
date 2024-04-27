import { AxiosResponse } from "axios";
import { useGetReviews, useUpdateReview } from "../../apiCalls/reviews"
import { Review } from "../../entities/Review";
import { useState } from "react";


/* export const useOnUpdateReviewPress = (contentId: number, contentType: string) => {
  const {updateReview, loading} = useUpdateReview();

  const onPress = (liked: boolean, review: string) => {
    const body = {
      contentId: contentId,
      contentType: contentType,
      liked: liked,
      review: review
    }
    updateReview(body, )
  }

  return {onPress}
} */

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
