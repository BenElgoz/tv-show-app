export interface Show {
    id: number;
    name: string;
    language: string;
    genres: string[];
    status: string;
    premiered: string;
    officialSite: string | null;
    summary: string;
    image: {
        medium: string;
        original: string;
    } | null;
    rating: {
        average: number | null;
    };
    network: {
        name: string;
    } | null;
    webChannel: {
        name: string;
    } | null;
    runtime: number | null;
}

export interface SearchShowResult {
    score: number;
    show: Show;
}

export interface Season {
    id: number;
    number: number;
    episodeOrder: number | null;
    premiereDate: string;
    endDate: string;
    image: {
        medium: string;
        original: string;
    } | null;
    summary: string | null;
}

export interface Episode {
    id: number;
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    runtime: number;
    summary: string | null;
    image: {
        medium: string;
        original: string;
    } | null;
}

export interface CastMember {
    person: {
        id: number;
        name: string;
        birthday: string | null;
        image: {
            medium: string;
            original: string;
        } | null;
    };
    character: {
        id: number;
        name: string;
        image: {
            medium: string;
            original: string;
        } | null;
    };
}

export interface Person {
    id: number;
    name: string;
    birthday: string | null;
    gender: string | null;
    country: {
        name: string;
    } | null;
    image: {
        medium: string;
        original: string;
    } | null;
    biography?: string; // API ne fournit pas toujours une bio
}

export interface CastCredit {
    _embedded: {
        show: Show;
    };
}
