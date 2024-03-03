export class ArtistEntry {
    public id: string
    public name: string
    public poster: string
    public birthDate: string
    public birthPlace: string
    public deathDate: string
    public gender: string

    constructor(artist: ArtistEntry) {
        this.id = artist.id
        this.name = artist.name
        this.poster = artist.poster
        this.birthDate = artist.birthDate
        this.birthPlace = artist.birthPlace
        this.deathDate = artist.deathDate
        this.gender = artist.gender
    }

    public static fromJson(artist: any): ArtistEntry {
        return new ArtistEntry({
            id: artist.id,
            name: artist.name,
            poster: artist.poster,
            birthDate: artist.birthDate,
            birthPlace: artist.birthPlace,
            deathDate: artist.deathDate,
            gender: artist.gender,
        })
    }

    public static serialize(artist: ArtistEntry): any {
        return {
            id: artist.id,
            name: artist.name,
            poster: artist.poster,
            birthDate: artist.birthDate,
            birthPlace: artist.birthPlace,
            deathDate: artist.deathDate,
            gender: artist.gender,
        }
    }
}
