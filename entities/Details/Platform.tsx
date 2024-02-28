export class Platform {
    public id: number;
    public logoPath: string;
    public providerName: string;
    public link: string;

    constructor(platform: Platform) {
        this.id = platform.id;
        this.logoPath = platform.logoPath;
        this.providerName = platform.providerName;
        this.link = platform.link;
    }

    public static fromJson(json: any): Platform {
        return new Platform({
            id: json.id,
            logoPath: json.logoPath,
            providerName: json.providerName,
            link: json.link
        });
    }
}
