export class SimilarContent {
    public id: number;
    public title: string;
    public posterPath: string;
    public releaseDate: Date;

    constructor(content: SimilarContent) {
        this.id = content.id;
        this.title = content.title;
        this.posterPath = content.posterPath;
        this.releaseDate = content.releaseDate;
    }

    public static fromJson(json: any): SimilarContent {
        return new SimilarContent({
            id: json.id,
            title: json.title,
            posterPath: json.posterPath,
            releaseDate: new Date(json.releaseDate)
        });
    }
}
