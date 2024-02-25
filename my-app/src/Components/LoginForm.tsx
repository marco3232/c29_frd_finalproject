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
import { ClassNames } from '@emotion/react';
// --------------------------------------------------------------------------------

export function LoginForm() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    // -----------------------------------------------

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('user');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    const { mutate: loginMutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            const payload = parseJwt(data.token)
            const username = data.data
            setUsername(username);
            sessionStorage.setItem("user", username);
            localStorage.setItem('token', data.token)
            payload["username"] = username
            console.log({ payload })
            setIsLoggedIn(true);
            dispatch(loginSuccess(payload))
            Swal.fire({
                title: "Login successful",
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
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
                    <div className='loginInput'>
                        <MDBInput
                            wrapperClass=""
                            label="Email address"
                            id="formControlLg"
                            type="email"
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginInput'>

                        <MDBInput
                            wrapperClass=""
                            label="Password"
                            id="formControlLg"
                            type="password"
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <MDBBtn
                        className="loginFormBtn "
                        color="info"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </MDBBtn>
                    <p className="forgotPassword"><a className="text-muted">Forgot password?</a></p>
                    <p className='ms-1'>Don't have an account?   <a href="/register" className="registerHere"> Register here</a></p>

                </form>
                <div>
                </div>
            </div >

        </MDBContainer >


    );
}

