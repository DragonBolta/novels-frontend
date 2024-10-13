import {ThemeIcon} from "@mantine/core";
import {Star, StarHalf, ThumbsUp} from "@phosphor-icons/react";
import React from "react";

type NovelStatsProps = {
    rating: number,
    likes: number,
}

const NovelStats: React.FC<NovelStatsProps> = ({ rating, likes }) => {
    const renderHearts = () => {
        const hearts = [];
        const fullHearts = Math.floor(rating);
        const hasHalfHeart = rating % 1 !== 0;

        for (let i = 0; i < fullHearts; i++) {
            hearts.push(
                <ThemeIcon classNames={{root: "border-0"}} size={16} variant={"transparent"}>
                    <Star key={i} size={16} weight={"fill"}/>
                </ThemeIcon>
            );
        }

        if (hasHalfHeart) {
            hearts.push(
                <ThemeIcon classNames={{root: "border-0"}} size={16} variant={"transparent"}>
                    <StarHalf key="half" size={16} weight={"fill"}/>
                </ThemeIcon>)
            ;
        }

        return hearts;
    };

    return (
        <div className="flex flex-row justify-start items-center space-x-4">
            <div className={`flex flex-row items-center space-x-0`}>
                <ThemeIcon size={20} variant={"transparent"}>
                    <ThumbsUp size={20} weight={"fill"}/>
                </ThemeIcon>
                <ThemeIcon variant={"transparent"}>
                    {likes}
                </ThemeIcon>
            </div>
            <div className={"flex flex-row justify-start items-center p--1"}>
                {renderHearts()}
            </div>
        </div>
    );
};

export default NovelStats;