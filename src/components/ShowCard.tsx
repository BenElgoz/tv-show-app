import React from 'react';
import { Show } from '../types/tvmaze.types';
import Link from 'next/link';

interface ShowCardProps {
    show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
    const imageUrl = show.image ? show.image.medium : '/no-image.png';
    const summaryText = show.summary
        ? show.summary.replace(/<[^>]+>/g, '').slice(0, 150) + '...'
        : 'Pas de résumé disponible.';

    return (
        <Link href={`/show/${show.id}`} className="show-card-link">
            <div className="show-card">
                <img src={imageUrl} alt={show.name} />
                <div className="show-card-content">
                    <h2>{show.name}</h2>
                    <p className="genres">{show.genres.join(', ')}</p>
                    <p className="summary">{summaryText}</p>
                </div>
            </div>
        </Link>
    );
};

export default ShowCard;
