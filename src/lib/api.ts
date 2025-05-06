import { CastMember, Episode, SearchShowResult, Season, Show, Person, CastCredit } from '../types/tvmaze.types';

const BASE_URL = 'https://api.tvmaze.com';

/**
 * Recherche des séries TV par nom.
 * @param query - Le texte à rechercher (nom de la série)
 * @returns Une liste de résultats contenant des séries.
 */
export async function fetchShows(query: string): Promise<SearchShowResult[]> {
    const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des séries');
    }
    return res.json();
}

/**
 * Récupère les détails d'une série spécifique par ID.
 * @param showId - ID unique de la série
 * @returns Les détails de la série.
 */
export async function fetchShowDetails(showId: number): Promise<Show> {
    const res = await fetch(`${BASE_URL}/shows/${showId}`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des détails de la série');
    }
    return res.json();
}

/**
 * Récupère la liste des saisons pour une série.
 * @param showId - ID unique de la série
 * @returns La liste des saisons.
 */
export async function fetchSeasons(showId: number): Promise<Season[]> {
    const res = await fetch(`${BASE_URL}/shows/${showId}/seasons`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des saisons');
    }
    return res.json();
}

/**
 * Récupère la liste des épisodes pour une saison spécifique.
 * @param seasonId - ID unique de la saison
 * @returns La liste des épisodes.
 */
export async function fetchEpisodes(seasonId: number): Promise<Episode[]> {
    const res = await fetch(`${BASE_URL}/seasons/${seasonId}/episodes`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des épisodes');
    }
    return res.json();
}

/**
 * Récupère la liste des acteurs principaux d'une série.
 * @param showId - ID unique de la série
 * @returns La liste des acteurs (cast).
 */
export async function fetchCast(showId: number): Promise<CastMember[]> {
    const res = await fetch(`${BASE_URL}/shows/${showId}/cast`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des acteurs');
    }
    return res.json();
}

/**
 * Récupère une liste de séries (page par page).
 * @param page - Le numéro de la page (commence à 0)
 * @returns La liste des séries.
 */
export async function fetchAllShows(page: number = 0): Promise<Show[]> {
    const res = await fetch(`${BASE_URL}/shows?page=${page}`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des séries par défaut');
    }
    return res.json();
}

/**
 * Récupère les détails d'un acteur par ID.
 * @param personId - ID de la personne
 * @returns Les détails de la personne.
 */
export async function fetchPersonDetails(personId: number): Promise<Person> {
    const res = await fetch(`${BASE_URL}/people/${personId}`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des détails de l\'acteur');
    }
    return res.json();
}

/**
 * Récupère les séries où l'acteur a joué.
 * @param personId - ID de la personne
 * @returns Les crédits d'acteur.
 */
export async function fetchPersonCastCredits(personId: number): Promise<CastCredit[]> {
    const res = await fetch(`${BASE_URL}/people/${personId}/castcredits?embed=show`);
    if (!res.ok) {
        throw new Error('Erreur lors du chargement des séries de l\'acteur');
    }
    return res.json();
}

