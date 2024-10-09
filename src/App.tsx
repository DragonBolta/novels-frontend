// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NovelChapter from './NovelChapter';
import LandingPage from "./LandingPage.tsx";
import ToC from "./NovelToC.tsx";
import NovelToC from "./NovelToC.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Define the route for the NovelChapter component */}
                    <Route index element={<LandingPage />} />
                    <Route path={"/"}>
                        <Route
                            path="novel/:novelName/"
                            element={<ToC />} // Use the element prop to render the component
                        />
                        <Route
                            path="novel/:novelName/chapter/:chapterNumber"
                            element={<NovelChapter />} // Use the element prop to render the component
                        />
                        <Route
                            path="novel/:novelName"
                            element={<NovelToC />}
                        />
                        <Route
                            path="novel/:novelName/"
                            element={<NovelToC />}
                        />
                        <Route
                            path="novel/:novelName/toc"
                            element={<NovelToC />}
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
