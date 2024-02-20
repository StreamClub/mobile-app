export type CastEntry = {
    id: number,
    title: string,
    poster: string,
    character: string,
    mediaType: string
}

export type CrewEntry = {
    id: number,
    title: string,
    poster: string,
    department: string,
    job: string,
    mediaType: string
}

export type Credits = {
    cast: Array<CastEntry>,
    crew: Array<CrewEntry>
}