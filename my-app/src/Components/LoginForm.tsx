import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../hook/userAPI';
import { UserData } from '../hook/models';

// --------------------------------------------------------------------------------

export function LoginForm() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState<UserData>();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();


    const { mutate: loginMutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            setIsLoggedIn(true);
            setUserData(data.user);
            Swal.fire({
                title: "Login successful",
                icon: 'success',
                showConfirmButton: false
            });
            navigate('/')
        },
        onError: (data) => {
            Swal.fire({
                title: "Login failed",
                text: data.message || "Unknown error",
                icon: 'error',
                showConfirmButton: false,
            })
        },
        onMutate: () => {
            setIsSubmitting(true);
        },
        onSettled: () => {
            setIsSubmitting(false);
        }
    })


    // -----------------------------------------------

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password || !email) {
            return Swal.fire({
                title: "Login failed",
                text: "Email and password cannot be empty",
                icon: 'error',
                showConfirmButton: false,
            })
        }

        try {
            const formData = { email, password }
            loginMutate(formData)
        } catch (error) {
            console.error('Error during login:', error);
        }
    };



    return (

        <MDBContainer fluid className="loginFormContainer">
            <div className="loginForm">
                <form className='loginFormFetch' onSubmit={handleLogin}>
                    <h3 className="loginTitle" style={{ letterSpacing: "1px" }} >
                        Login
                    </h3>

                    <MDBInput
                        wrapperClass="mb-4 mx-5 w-100"
                        label="Email address"
                        id="formControlLg"
                        type="email"
                        size="lg"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass="mb-4 mx-5 w-100"
                        label="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <MDBBtn
                        className="loginBtn mb-4 px-5 mx-5 w-100"
                        color="info"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </MDBBtn>
                    <p className="small mb-5 pb-lg-2 ms-1"><a className="text-muted" href="#!">Forgot password?</a></p>
                    <p className='ms-1'>Don't have an account? <a href="/register" className="link-info">Register here</a></p>

                </form>
            </div>
        </MDBContainer >
    );
}

