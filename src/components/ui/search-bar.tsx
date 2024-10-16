import React, {useState, useEffect} from 'react';
import {useSearch} from "@/features/search/api/get-search.ts";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    // Debouncing effect: Updates `debouncedSearchTerm` after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm); // Update debounced term after delay
        }, 250); // 500ms debounce delay

        return () => {
            clearTimeout(handler); // Clear timeout if the searchTerm changes before 500ms
        };
    }, [searchTerm]); // Runs effect whenever `searchTerm` changes

    // Define the searchOptions object using debouncedSearchTerm
    const searchOptions = {
        title_english: debouncedSearchTerm, // Use debounced term for the search
    };

    // Use the useSearch hook with the searchOptions object
    const { data, isLoading, error } = useSearch({ filter: searchOptions });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Update state immediately on change
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by title (English)"
            />

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {data && (
                <ul>
                    {data.search_results.map((novel, index) => (
                        <li key={index}>{novel.title_english}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;