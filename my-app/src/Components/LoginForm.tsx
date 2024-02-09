import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
} from "mdb-react-ui-kit";

/* --------------------------------------------------------------------------------------------------------- */

function LoginForm() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!password) {
            return alert("Password cannot be empty!");
        }
        if (!email) {
            return alert("Email cannot be empty");
        } else {
            return alert("Login success")

        }

    }
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
                    >
                        Login
                    </MDBBtn>
                    <a className="forgotPw" href="#!">
                        Forgot password?
                    </a>
                    <p className="">
                        Don't have an account?{" "}
                        <a href="#!" className="registerHere">
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </MDBContainer >
    );
}


export default LoginForm;