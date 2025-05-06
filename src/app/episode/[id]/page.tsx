import { fetchEpisodeDetails } from '../../../lib/api';
import { Episode } from '../../../types/tvmaze.types';

interface EpisodePageProps {
    params: Promise<{ id: string }>;
}

const EpisodePage = async ({ params }: EpisodePageProps) => {
    const { id } = await params;
    const episodeId = Number(id);
    let episode: Episode;

    try {
        episode = await fetchEpisodeDetails(episodeId);
    } catch (error) {
        return <p>Erreur lors du chargement des données.</p>;
    }

    return (
        <main className="episode-detail">
            <h1>{episode.name}</h1>
            {episode.image && (
                <img src={episode.image.original} alt={episode.name} />
            )}
            <p>
                Saison {episode.season}, Épisode {episode.number}
            </p>
            <p>
                Diffusé le : {episode.airdate} à {episode.airtime}
            </p>
            <p>Durée : {episode.runtime} min</p>
            <p dangerouslySetInnerHTML={{ __html: episode.summary || 'Pas de résumé.' }}></p>
        </main>
    );
};

export default EpisodePage;
