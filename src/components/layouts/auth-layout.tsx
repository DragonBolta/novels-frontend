import React from 'react';
import AuthenticationForm from "@/features/auth/components/auth-form.tsx";

const AuthLayout: React.FC = () => {

    return (
        <>
            <div className="flex flex-col items-center">
                <AuthenticationForm/>
            </div>
        </>
    );
}

export default AuthLayout;