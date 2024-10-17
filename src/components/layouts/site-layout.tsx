import { Outlet } from "react-router-dom";
import HeaderBar from "@/components/ui/header.tsx";

const Layout = () => {
    return (
        <div>
            <HeaderBar />
            <Outlet />
        </div>
    );
};

export default Layout;