export class CastMember {
    public name: string;
    public profilePath: string;
    public character: string;
    public id: number;

    constructor(cast: CastMember) {
        this.name = cast.name;
        this.profilePath = cast.profilePath;
        this.character = cast.character;
        this.id = cast.id;
    }

    public static fromJson(json: any): CastMember {
        return new CastMember({
            name: json.name,
            profilePath: json.profilePath,
            character: json.character,
            id: json.id
        });
    }
}
