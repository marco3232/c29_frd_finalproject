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
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slice/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notification } from 'antd';
import { parseJwt } from '../utils/authGuard';
// --------------------------------------------------------------------------------

export function LoginForm() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    // -----------------------------------------------

    const { mutate: loginMutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const notify = () => toast("Login successful");
            localStorage.setItem('token', data.token)
            const payload = parseJwt(data.token)
            const username = data.data
            payload["username"] = username
            console.log({payload})
            setIsLoggedIn(true);
            dispatch(loginSuccess(payload))
            Swal.fire({
                title: "Login successful",
                icon: 'success',
                showConfirmButton: false
            });
            if (payload.role === "admin") {
                navigate('/admin')

            } else {

                navigate('/')
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

    // -----------------------------------------------

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass="mb-4 mx-5 w-100"
                        label="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <MDBBtn
                        className="loginFormBtn mb-4 px-5 mx-5 w-100"
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
                <div>
                </div>
            </div>
        </MDBContainer >
    );
}

