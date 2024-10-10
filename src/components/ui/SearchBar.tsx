import React, {useState, useEffect, ChangeEvent} from 'react';
import {NovelInfo} from "@/types/api.ts";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<NovelInfo[]>([]);
    const [filteredItems, setFilteredItems] = useState<NovelInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Limit the number of results displayed
    const resultLimit = 20; // Set this to the number of results you want to show

    // Fetch items from API when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/api/query?'); // Replace with your API URL
                const data = await response.json();
                setItems(data); // Assuming 'data' is an array of items
            } catch (err) {
                setError('Failed to fetch items' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems().then();
    }, []);

    // Move filtering logic to a separate useEffect that depends on searchTerm
    useEffect(() => {
        if (searchTerm.length >= 3) {
            const filtered = items
                .filter(item =>
                    item["title_english"].toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, resultLimit);
            setFilteredItems(filtered);
        } else {
            setFilteredItems([]);
        }
    }, [searchTerm, items]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value); // Always update searchTerm
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                style={{ padding: '10px', width: '300px' }}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => <li key={index}>{item["title_english"]}</li>)
                ) : (
                    <li>No items found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchBar;