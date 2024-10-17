import React from 'react';
import Search from "@/features/search/components/search.tsx";

const SearchLayout: React.FC = () => {
    // Use the useSearch hook with the searchOptions object
    return (
        <>
            <div className="flex flex-col items-center">
                <Search/>
            </div>
        </>
    );
}

export default SearchLayout;