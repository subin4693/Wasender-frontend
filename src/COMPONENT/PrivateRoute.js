import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, adminOnly, ...rest }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return token ? true : false;
    };

    const isAdmin = () => {
        const userRole = localStorage.getItem("userRole");
        return userRole === "admin";
    };

    return (
        <div></div>

        // <Route
        //     {...rest}
        //     element={
        //         isAuthenticated() ? (
        //             adminOnly && !isAdmin() ? (
        //                 <Navigate to="/signup" />
        //             ) : (
        //                 <Element adminOnly={adminOnly && isAdmin()} />
        //             )
        //         ) : (
        //             <Navigate to="/register" />
        //         )
        //     }
        // />
    );
};

export default PrivateRoute;
