// App.tsx
import React from 'react';
import AppRouter from "@/app/router.tsx";
import AppProvider from "@/app/provider.tsx";

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
};

export default App;
