import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';

function App() {
    return (
        <MDBContainer fluid className='loginFormContainer'>

            <div className='loginForm'>

                <h3 className="loginTitle" style={{ letterSpacing: '1px' }}>Log in</h3>

                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" />

                <MDBBtn className="loginBtn mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
                <a className="forgotPw" href="#!">Forgot password?</a>
                <p className=''>Don't have an account? <a href="#!" className="registerHere">Register here</a></p>

            </div>
        </MDBContainer >
    );
}

export default App;