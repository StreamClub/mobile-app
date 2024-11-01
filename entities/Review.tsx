export class Review {
  public id: string;
  public userId: number;
  public contentId: number;
  public contentType: string;
  public liked: boolean;
  public review: string;
  public userName: string;
  public photoId: number;

  constructor(review: Review) {
    this.id = review.id;
    this.userId = review.userId;
    this.contentId = review.contentId;
    this.contentType = review.contentType;
    this.liked = review.liked;
    this.review = review.review;
    this.userName = review.userName;
    this.photoId = review.photoId;
  }

  public static fromJson(json: any): Review {
    return new Review({
      id: json.id,
      userId: json.userId,
      contentId: json.contentId,
      contentType: json.contentType,
      liked: json.liked,
      review: json.review,
      userName: json.userName,
      photoId: json.photoId
    });
  }
}
