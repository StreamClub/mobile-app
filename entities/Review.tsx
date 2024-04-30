export class Review {
  public id: string;
  public userId: number;
  public contentId: number;
  public contentType: string;
  public liked: boolean;
  public review: string;

  constructor(review: Review) {
    this.id = review.id;
    this.userId = review.userId;
    this.contentId = review.contentId;
    this.contentType = review.contentType;
    this.liked = review.liked;
    this.review = review.review;
  }

  public static fromJson(json: any): Review {
    return new Review({
      id: json.id,
      userId: json.userId,
      contentId: json.contentId,
      contentType: json.contentType,
      liked: json.liked,
      review: json.review
    });
  }
}
