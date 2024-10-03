// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NovelChapter from './NovelChapter';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Define the route for the NovelChapter component */}
                    <Route
                        path="/novel/:novelName/chapter/:chapterNumber"
                        element={<NovelChapter />} // Use the element prop to render the component
                    />
                    {/* You can add more routes here for other components */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
