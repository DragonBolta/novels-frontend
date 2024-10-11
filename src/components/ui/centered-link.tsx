import { NavLink } from '@mantine/core';
import React from "react";

// Define the props interface for the CenteredLink
type CenteredLinkProps = {
    label: string;
    href: string;
    route: string;
}

// Define the props interface for the CenteredInternalLink, extending CenteredLinkProps
type CenteredInternalLinkProps = Omit<CenteredLinkProps, 'href'>

export const CenteredLink: React.FC<CenteredLinkProps> = ({ label, href, route }) => {
    const fullHref = `${href}${route}`; // Combine href and route
    return (
        <NavLink
            classNames={{ label: "flex justify-center items-center w-fit text-center", body: "flex w-fit items-center justify-center", root: "w-full"}}
            label={label}
            href={fullHref}
        />
    );
};

export const CenteredInternalLink: React.FC<CenteredInternalLinkProps> = ({label, route}) => {
    return (
        <CenteredLink
            label={label}
            href = {import.meta.env.VITE_SITE_URL}
            route ={route}
        />
    );
}