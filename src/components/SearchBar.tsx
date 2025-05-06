'use client';

import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
    onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onQueryChange }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onQueryChange(value);
    };

    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Rechercher une série..."
            />
        </form>
    );
};

export default SearchBar;
