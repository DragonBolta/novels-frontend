import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useMemo} from "react";
import {SearchRoute} from "@/app/routes/novels/search-page.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export const createAppRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const {NovelsRoute} = await import ('./routes/novels/novels-page');
                return {Component: NovelsRoute};
            }
        },
        {
            path: "/novels",
            lazy: async () => {
                const {NovelsRoute} = await import ('./routes/novels/novels-page');
                return {Component: NovelsRoute};
            }
        },
        {
            path: '/search',
            element: <SearchRoute/>
        },
        {
            path: '/novel/:novelName/',
            lazy: async () => {
                const {NovelRoute} = await import('./routes/novels/novel-page');
                return {Component: NovelRoute};
            }
        },
        {
            path: '/novel/:novelName/chapter/:chapterNumber',
            lazy: async () => {
                const {ChapterRoute} = await import('./routes/novels/chapter-page');
                return {Component: ChapterRoute};
            }
        },
        {
            path: '/novel/:novelName/toc',
            lazy: async () => {
                const {NovelRoute} = await import('./routes/novels/novel-page');
                return {Component: NovelRoute};
            }
        },
        {
            path: '*',
            element: <div>Error</div>
        }
    ])
}

export const AppRouter = () => {

    const router = useMemo(() => createAppRouter(), []);

    return <RouterProvider router={router}/>;
};

export default AppRouter;