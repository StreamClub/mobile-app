export type CreditsEntry = {
    id: number;
    title: string;
    name?: string;
    poster: string;
    mediaType: string;
}

export type CastEntry = CreditsEntry & {
    character: string;
}

export type CrewEntry = CreditsEntry & {
    department: string;
    job: string;
}

export type Credits = {
    cast: Array<CastEntry>,
    crew: Array<CrewEntry>
}