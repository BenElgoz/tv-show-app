'use client';

import React, { useState, ChangeEvent } from 'react';

interface FiltersProps {
    onFiltersChange: (filters: FiltersState) => void;
}

export interface FiltersState {
    genre: string;
    decade: string;
    year: string;
    status: string;
}

const Filters: React.FC<FiltersProps> = ({ onFiltersChange }) => {
    const [filters, setFilters] = useState<FiltersState>({
        genre: '',
        decade: '',
        year: '',
        status: '',
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    return (
        <div className="filters">
            <select name="genre" value={filters.genre} onChange={handleChange}>
                <option value="">Tous genres</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
                <option value="Science-Fiction">Science-Fiction</option>
                <option value="Romance">Romance</option>
            </select>

            <select name="decade" value={filters.decade} onChange={handleChange}>
                <option value="">Toutes décennies</option>
                <option value="1970">1970s</option>
                <option value="1980">1980s</option>
                <option value="1990">1990s</option>
                <option value="2000">2000s</option>
                <option value="2010">2010s</option>
                <option value="2020">2020s</option>
            </select>

            <select name="status" value={filters.status} onChange={handleChange}>
                <option value="">Tous statuts</option>
                <option value="Ended">Terminé</option>
                <option value="Running">En cours</option>
            </select>
        </div>
    );
};

export default Filters;
