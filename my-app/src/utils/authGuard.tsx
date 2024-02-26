import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hook/hooks";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

// --------------------------------------------------------------------------------

export function AuthGuard() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            Swal.fire({
                title: "Please sign in to continue",
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            });;
        }
    }, [isAuthenticated]);

    console.log({
        isAuthenticated
    })
    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
}


// --------------------------------------------------------------------------------

export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// --------------------------------------------------------------------------------

