import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {Loader, MantineProvider} from '@mantine/core';
import {queryConfig} from "@/lib/react-query.ts";

type AppProviderProps = {
    children: React.ReactNode;
};

const AppProvider= ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            }),
    );
    return (
        <MantineProvider defaultColorScheme={"light"}>
            <React.Suspense
                fallback={
                    <div className="flex h-screen w-screen items-center justify-center">
                        <Loader size="xl"/>
                    </div>
                }
            >
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </React.Suspense>
        </MantineProvider>
    )
}

export default AppProvider;