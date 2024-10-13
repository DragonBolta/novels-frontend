import { Chip, useMantineTheme } from "@mantine/core";
import { MouseEventHandler } from "react";

type SearchChipProps = {
    state: number;
    tag: string;
    onClick: MouseEventHandler<HTMLInputElement>; // Corrected type
};

const SearchChip: React.FC<SearchChipProps> = ({ state, tag, onClick }) => {
    const theme = useMantineTheme();

    const getChipColor = (state: number) => {
        if (state === 1) return theme.colors.green[8];
        if (state === 2) return theme.colors.red[8];
        return "transparent";
    };

    const getVariant = (state: number) => {
        if (state === 0) return "outline";
        return "filled";
    };

    const getTextColor = (state: number) => {
        if (state === 0) return theme.white[4]; // Use Mantine theme for text colors
        return theme.colors.dark[9]; // Dark text color for active states
    };

    return (
        <Chip
            styles={{ label: { backgroundColor: getChipColor(state), color: getTextColor(state) } }}
            classNames={{
                root: "flex flex-col m-0.5 justify-center items-center",
                iconWrapper: "max-w-[0px] max-h-[0px]", // Hides the icon space
                label: "flex justify-center items-center w-fit autoContrast",
            }}
            onClick={onClick} // Correct event handler typing
            variant={getVariant(state)}
            value={state.toString()} // Use string values for Chip component
            checked={false} // Ensure Chip is not "checked"
        >
            {tag}
        </Chip>
    );
};

export default SearchChip;
