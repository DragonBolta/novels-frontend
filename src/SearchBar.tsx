import React, {useState, useEffect, ChangeEvent} from 'react';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Limit the number of results displayed
    const resultLimit = 5; // Set this to the number of results you want to show

    // Fetch items from API when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/novels/query?'); // Replace with your API URL
                const data = await response.json();
                setItems(data); // Assuming 'data' is an array of items
                setFilteredItems(data);
            } catch (err) {
                setError('Failed to fetch items' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Filter items based on search term
    useEffect(() => {
        setFilteredItems(
            items
                .filter(item =>
                    item.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .slice(0, resultLimit) // Limit the number of results displayed
        );
    }, [searchTerm, items]);

    const handleChange = (event: ChangeEvent) => {
        if (event && event.target && event.target.value.length >= 3) {
            setSearchTerm(event.target.value);
        }
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
                    filteredItems.map((item, index) => <li key={index}>{item}</li>)
                ) : (
                    <li>No items found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchBar;