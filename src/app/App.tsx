// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NovelChapter from '@/features/chapter/components/novel-chapter.tsx';
import NovelsLayout from "@/components/layouts/novels-layout.tsx";
import ToC from "@/features/table-of-contents/components/table-of-contents.tsx";
import {NovelsRoute} from "@/app/routes/novels/novels-page.tsx";
import SearchBar from "@/components/ui/SearchBar.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Define the route for the NovelChapter component */}
                    <Route index element={<NovelsLayout />} />
                    <Route path={"/"}>
                        <Route path={"search"} element={<SearchBar />}/>
                        <Route
                            path="novel/:novelName/"
                            element={<NovelsRoute />} // Use the element prop to render the component
                        />
                        <Route
                            path="novel/:novelName/chapter/:chapterNumber"
                            element={<NovelChapter />} // Use the element prop to render the component
                        />
                        <Route
                            path="novel/:novelName/toc"
                            element={<ToC />}
                        />
                        <Route
                            path="*"
                            element={<> Error </>}
                        />
                    </Route>
                    {/* You can add more routes here for other components */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
