import { fetchEpisodes, fetchSeasonDetails } from '../../../lib/api';
import { Episode, Season } from '../../../types/tvmaze.types';
import Link from 'next/link';

interface SeasonPageProps {
    params: Promise<{ id: string }>;
}

const SeasonPage = async ({ params }: SeasonPageProps) => {
    const { id } = await params;
    const seasonId = Number(id);
    let season: Season;
    let episodes: Episode[];

    try {
        season = await fetchSeasonDetails(seasonId);
        episodes = await fetchEpisodes(seasonId);
    } catch (error) {
        return <p>Erreur lors du chargement des données.</p>;
    }

    return (
        <main className="season-detail">
            <h1>Saison {season.number}</h1>
            {season.image && (
                <img src={season.image.original} alt={`Saison ${season.number}`} />
            )}
            <p dangerouslySetInnerHTML={{ __html: season.summary || 'Pas de résumé.' }}></p>
            <p>
                Diffusée : {season.premiereDate} → {season.endDate}
            </p>

            <section>
                <h2>Épisodes</h2>
                <ul>
                    {episodes.map((ep) => (
                        <li key={ep.id}>
                            <Link href={`/episode/${ep.id}`}>
                                {ep.number}. {ep.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default SeasonPage;
