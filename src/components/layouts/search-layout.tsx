import React from 'react';
import HeaderBar from "@/components/ui/header.tsx";
import Search from "@/features/search/components/search.tsx";

const SearchLayout: React.FC = () => {
    // Use the useSearch hook with the searchOptions object
    return (
        <>
            <div className="flex flex-col items-center">
                <HeaderBar />
                <Search/>
            </div>
        </>
    );
}

export default SearchLayout;