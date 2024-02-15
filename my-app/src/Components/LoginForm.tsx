import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";

// --------------------------------------------------------------------------------

export function LoginForm() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password || !email) {
            return alert("Email and password cannot be empty");
        }
        try {
            // loginUser(email, password)
        } catch (error) {
            console.error('Error during login:', error);
            setError("An error occurred during login");
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
                    >
                        Login
                    </MDBBtn>
                    <p className="error">{error}</p>
                </form>
            </div>

        </MDBContainer >
    );
}
