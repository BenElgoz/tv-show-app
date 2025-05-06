import Link from "next/link";
import { fetchCast, fetchSeasons, fetchShowDetails } from "../../../lib/api";
import { CastMember, Season, Show } from "../../../types/tvmaze.types";

interface ShowPageProps {
  params: Promise<{ id: string }>;
}

const ShowPage = async ({ params }: ShowPageProps) => {
  const { id } = await params;
  const showId = Number(id);
  let show: Show;
  let seasons: Season[];
  let cast: CastMember[];

  try {
    show = await fetchShowDetails(showId);
    seasons = await fetchSeasons(showId);
    cast = await fetchCast(showId);
  } catch (error) {
    return <p>Erreur lors du chargement des données.</p>;
  }

  return (
    <main className="show-detail">
      <h1>{show.name}</h1>
      <img
        src={show.image ? show.image.original : "/no-image.png"}
        alt={show.name}
      />
      <p
        dangerouslySetInnerHTML={{ __html: show.summary || "Pas de résumé." }}
      ></p>

      <section>
        <h2>Saisons</h2>
        <ul>
          {seasons.map((season) => (
            <li key={season.id}>
              <Link href={`/season/${season.id}`}>
                Saison {season.number} : {season.episodeOrder ?? "?"} épisodes (
                {season.premiereDate} → {season.endDate})
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Acteurs principaux</h2>
        <ul className="cast-list">
          {cast.map((member) => (
            <li key={member.person.id}>
              <Link href={`/actor/${member.person.id}`}>
                <img
                  src={
                    member.person.image
                      ? member.person.image.medium
                      : "/no-image.png"
                  }
                  alt={member.person.name}
                />
                <p>
                  {member.person.name} (rôle : {member.character.name})
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ShowPage;
