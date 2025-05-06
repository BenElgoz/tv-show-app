import { fetchPersonCastCredits, fetchPersonDetails } from '../../../lib/api';
import { CastCredit, Person } from '../../../types/tvmaze.types';
import ShowCard from '../../../components/ShowCard';

interface ActorPageProps {
    params: Promise<{ id: string }>;
}

const ActorPage = async ({ params }: ActorPageProps) => {
    const { id } = await params;
    const personId = Number(id);
    let person: Person;
    let castCredits: CastCredit[];

    try {
        person = await fetchPersonDetails(personId);
        castCredits = await fetchPersonCastCredits(personId);
    } catch (error) {
        return <p>Erreur lors du chargement des données.</p>;
    }

    return (
        <main className="actor-detail">
            <h1>{person.name}</h1>
            {person.image && (
                <img src={person.image.original} alt={person.name} />
            )}
            <p><strong>Date de naissance :</strong> {person.birthday || 'Inconnue'}</p>
            <p><strong>Genre :</strong> {person.gender || 'Inconnu'}</p>
            {person.country && <p><strong>Pays :</strong> {person.country.name}</p>}

            <section>
                <h2>Séries principales</h2>
                <div className="results-grid">
                    {castCredits.map((credit) => (
                        <ShowCard
                            key={credit._embedded.show.id}
                            show={credit._embedded.show}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ActorPage;
