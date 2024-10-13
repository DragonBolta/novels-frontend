import { searchOptions } from "@/features/search/api/get-search.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import SearchChip from "@/features/search/components/search-chip.tsx";
import {NumberInput, TextInput} from "@mantine/core";

type SearchControlProps = {
    currentSearch: searchOptions;
    setNewSearch: Dispatch<SetStateAction<searchOptions>>;
};

type Tags = {
    [key: string]: number;
};

const SearchControl: React.FC<SearchControlProps> = ({ currentSearch, setNewSearch }) => {

    // Possible search params with tags
    const possibleSearchParams: searchOptions = {
        title: "",
        source: "",
        tags: [
            "Romance", "Fantasy", "Modern", "Wuxia", "Science Fantasy", "Historical",
            "Game", "Fusion", "Regression", "Possession", "Munchkin", "Sports",
            "Adult", "BL/GL", "Etc."
        ],
        tags_exclude: [],
        author: "",
        description: "",
        first_chapter_link: "",
        rating: 0,
        likes: 0,
        source_english: "",
        title_english: "",
        description_english: "",
    };

    // Tags state
    const [tags, setTags] = useState<Tags>({
        "Romance": 0,
        "Fantasy": 0,
        "Modern": 0,
        "Wuxia": 0,
        "Science Fantasy": 0,
        "Historical": 0,
        "Game": 0,
        "Fusion": 0,
        "Regression": 0,
        "Possession": 0,
        "Munchkin": 0,
        "Sports": 0,
        "Adult": 0,
        "BL/GL": 0,
        "Etc.": 0,
    });

// Initialize tags based on currentSearch
    useEffect(() => {
        const newTags = { ...tags }; // Create a copy of the current tags state

        // Reset all tags to 0 first
        for (const tag in newTags) {
            newTags[tag] = 0;
        }

        if (currentSearch.tags) {
            // Set tags from currentSearch
            currentSearch.tags.forEach((tag: string) => {
                newTags[tag] = 1; // Set value to 1 for included tags
            });
        }

        if (currentSearch.tags_exclude) {
            // Set excluded tags
            currentSearch.tags_exclude.forEach((tag: string) => {
                newTags[tag] = 2; // Set value to 2 for excluded tags
            });
        }

        // Update the tags state
        setTags(newTags);
    }, [currentSearch]);

    // Search params state
    const [searchParams, setSearchParams] = useState<searchOptions>(currentSearch);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);

    // Handler for tag click
    const tagButtonHandler = (tag: string) => {
        setTags((prevTags) => {
            const newTags = {
                ...prevTags,
                [tag]: (prevTags[tag] + 1) % 3, // Cycle state between 0, 1, and 2
            };

            // Update search params based on the new tags state
            setSearchParams((prevParams) => ({
                ...prevParams,
                tags: Object.keys(newTags).filter((tag) => newTags[tag] === 1),
                tags_exclude: Object.keys(newTags).filter((tag) => newTags[tag] === 2),
            }));

            return newTags;
        });
    };


    // Handler for search button click
    const searchButtonHandler = () => {
        setNewSearch(searchParams);
    };

    const textInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setTitle(newValue); // Update local state with new input value
        setSearchParams((prevParams => ({
            ...prevParams,
            title_english: newValue
        }))); // Update the URL searchParams
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            searchButtonHandler(); // Call search function on Enter
        }
    };

// Updated input handlers to handle both string and number
    const ratingInputHandler = (value: string | number | null) => {
        // If value is a string that can be converted to a number
        const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
        if (!parsedValue) {return}

        // Set the state and searchParams based on the parsed value
        setRating(parsedValue); // Convert null to undefined
        setSearchParams((prevParams) => ({
            ...prevParams,
            rating: parsedValue ?? 0, // Default to 0 if value is null or undefined
        }));
    };

    const likesInputHandler = (value: string | number | null) => {
        // If value is a string that can be converted to a number
        const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
        if (!parsedValue) {return}

        // Set the state and searchParams based on the parsed value
        setLikes(parsedValue); // Convert null to undefined
        setSearchParams((prevParams) => ({
            ...prevParams,
            likes: parsedValue ?? 0, // Default to 0 if value is null or undefined
        }));
    };

    return (
        <>
            <div className={"flex flex-row p-4 md:w-9/12"}>
                <div className={"flex flex-col"}>
                    <TextInput
                        label={"Title"}
                        placeholder={"Title"}
                        value={title}
                        onChange={textInputHandler}
                        onKeyDown={handleKeyPress}
                    />
                    <div className="flex flex-wrap mt-1 max-w-fit max-h-fit">
                        {possibleSearchParams.tags &&
                            possibleSearchParams.tags.map((tag) => (
                                <SearchChip
                                    tag={tag}
                                    state={tags[tag]} // Pass the tag state
                                    onClick={() => tagButtonHandler(tag)} // Wrap handler in a function
                                    key={tag}
                                />
                            ))}
                    </div>
                    <div className={"flex flex-row space-x-2"}>
                        <NumberInput
                            label={"Rating"}
                            placeholder={"Rating"}
                            value={rating}
                            onChange={ratingInputHandler} // Attach the rating input handler
                            min={0}
                            max={5}
                            step={0.5}
                            clampBehavior="strict"
                            allowNegative={false}
                        />
                        <NumberInput
                            label={"Likes"}
                            placeholder={"Likes"}
                            value={likes}
                            onChange={likesInputHandler} // Attach the likes input handler
                            min={0}
                            step={1}
                            allowDecimal={false}
                            clampBehavior="strict"
                            allowNegative={false}
                        />
                    </div>
                </div>
                <div className="flex flex-col m-2.5 items-center justify-center min-h-full">
                    <MagnifyingGlass className={"hover: cursor-pointer"} size={32} weight="fill" onClick={searchButtonHandler}/>
                </div>
            </div>
        </>
    );
};

export default SearchControl;
