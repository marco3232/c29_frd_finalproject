import React, { useState } from 'react';
import Swal from 'sweetalert2'
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../hook/userAPI';
// --------------------------------------------------------------------------------


export function LoginForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const { mutate: loginMutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data && data.message === "Login successful!") {
                Swal.fire({
                    title: "Login successful",
                    icon: 'success',
                    showConfirmButton: false,
                })
                navigate("/")

            }
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
                    <h3 className="loginTitle" style={{ letterSpacing: "1px" }}>
                        Log in
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
                    <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
                    <p className='ms-5'>Don't have an account? <a href="/register" className="link-info">Register here</a></p>

                </form>
            </div>

        </MDBContainer >
    );
}

