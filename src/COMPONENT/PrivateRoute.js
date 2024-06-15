import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.userReducer.user);

    if (user?.id) {
        return <>{children}</>;
    } else {
        return (
            <>
                <Navigate to="/" />
            </>
        );
    }
};

export default PrivateRoute;
