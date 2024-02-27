import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../hook/userAPI';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slice/authSlice';
import { parseJwt } from '../utils/authGuard';
import loginImg from "../image/pexels-photo-5790837.webp"
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


    // -----------------------------------------------

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
                timer: 1500
            });
            if (payload.role === "admin") {
                sessionStorage.setItem('role', payload.role)
                navigate('/admin')
            } else {
                navigate('/')
            }
        },

        // -----------------------------------------------

        onError: (data) => {
            Swal.fire({
                title: data.message || "Unknown error",
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
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
                title: "Sorry, Email and password cannot be empty",
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
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
        <div className='loginFormControl'>
            <MDBContainer fluid className="loginFormContainer">
                <div className='loginImg'>
                    <MDBCol sm='6' className='d-none d-sm-block px-0'>
                        <img src={loginImg} id='loginImg' />
                    </MDBCol>
                </div>
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
                        <div className='loginInput2'>

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
                        <div className='loginFooter'>
                            <p className='registerHereForm'>Don't have an account?<a href="/register" className="registerHere">　Register here</a></p>
                        </div>

                    </form>
                    <div>
                    </div>
                </div >

            </MDBContainer >
        </div>

    );
}

