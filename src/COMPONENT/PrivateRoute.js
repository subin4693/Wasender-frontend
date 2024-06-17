import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.userReducer.user);
<<<<<<< HEAD
    console.log("user from private route ");
    console.log(user);
=======

>>>>>>> 4a40780c8889de48ef17dbc976686d1b35c7ba12
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
