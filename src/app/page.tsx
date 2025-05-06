'use client';

import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filters, { FiltersState } from '../components/Filters';
import ShowCard from '../components/ShowCard';
import { fetchAllShows, fetchShows } from '../lib/api';
import { Show } from '../types/tvmaze.types';

const SHOWS_PER_PAGE = 20;

const HomePage = () => {
    const [allResults, setAllResults] = useState<Show[]>([]);
    const [filteredResults, setFilteredResults] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [serverPage, setServerPage] = useState(0);
    const [clientPage, setClientPage] = useState(0);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FiltersState>({
        genre: '',
        decade: '',
        year: '',
        status: '',
    });

    // Debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery.trim() === '') {
                loadShowsPage(0);
            } else {
                handleSearch(searchQuery.trim());
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    useEffect(() => {
        applyFilters();
    }, [filters, allResults]);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError(null);
        setIsSearchMode(true);
        try {
            const data = await fetchShows(query);
            const shows = data.map((item) => item.show);
            setAllResults(shows);
            setClientPage(0);
        } catch (err) {
            setError('Une erreur est survenue lors de la recherche.');
        } finally {
            setLoading(false);
        }
    };

    const loadShowsPage = async (pageNumber: number) => {
        setLoading(true);
        setError(null);
        setIsSearchMode(false);
        try {
            const defaultShows = await fetchAllShows(pageNumber);
            setAllResults(defaultShows);
            setServerPage(pageNumber);
            setClientPage(0);
        } catch (err) {
            console.error(err);
            setError('Erreur lors du chargement des séries.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = allResults;

        if (filters.genre) {
            filtered = filtered.filter((show) =>
                show.genres.includes(filters.genre)
            );
        }

        if (filters.status) {
            filtered = filtered.filter((show) => show.status === filters.status);
        }

        if (filters.decade) {
            filtered = filtered.filter((show) => {
                if (!show.premiered) return false;
                const year = parseInt(show.premiered.slice(0, 4), 10);
                return (
                    year >= parseInt(filters.decade) &&
                    year < parseInt(filters.decade) + 10
                );
            });
        }

        if (filters.year) {
            filtered = filtered.filter((show) => {
                if (!show.premiered) return false;
                const year = parseInt(show.premiered.slice(0, 4), 10);
                return year === parseInt(filters.year);
            });
        }

        setFilteredResults(filtered);
    };

    useEffect(() => {
        loadShowsPage(0);
    }, []);

    const totalClientPages = Math.ceil(filteredResults.length / SHOWS_PER_PAGE);
    const paginatedResults = filteredResults.slice(
        clientPage * SHOWS_PER_PAGE,
        (clientPage + 1) * SHOWS_PER_PAGE
    );

    return (
        <main>
            <h1>Recherche de Séries</h1>
            <SearchBar onQueryChange={setSearchQuery} />
            <Filters onFiltersChange={setFilters} />
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            <div className="results-grid">
                {paginatedResults.length === 0 && !loading && <p>Aucun résultat</p>}
                {paginatedResults.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>

            {!isSearchMode && (
                <div className="pagination">
                    <button
                        onClick={() => {
                            if (clientPage > 0) {
                                setClientPage(clientPage - 1);
                            } else if (serverPage > 0) {
                                loadShowsPage(serverPage - 1);
                            }
                        }}
                        disabled={serverPage === 0 && clientPage === 0}
                    >
                        Précédent
                    </button>
                    <span>
                        Page {serverPage * totalClientPages + (clientPage + 1)}
                    </span>
                    <button
                        onClick={() => {
                            if (clientPage < totalClientPages - 1) {
                                setClientPage(clientPage + 1);
                            } else {
                                loadShowsPage(serverPage + 1);
                            }
                        }}
                        disabled={
                            paginatedResults.length < SHOWS_PER_PAGE &&
                            clientPage >= totalClientPages - 1
                        }
                    >
                        Suivant
                    </button>
                </div>
            )}
        </main>
    );
};

export default HomePage;
