import { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBRadio,
    MDBCheckbox,
} from 'mdb-react-ui-kit';

/* --------------------------------------------------------------------------------------------------------- */

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleRegister = () => {
        // 在這裡進行註冊邏輯，將用戶名和密碼保存到數據庫
        // 可以使用上述狀態變量來獲取用戶輸入的值
    };

    return (
        <MDBContainer fluid className='RegisterFormContainer'>
            <MDBCardBody className='RegisterFormFirstContainer'>
                <h3 className='registerTitle'>Registration </h3>

                <MDBRow>
                    <MDBCol md='6' className='firstNameInput'>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='First Name'
                            size='lg'
                            id='form1'
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </MDBCol>
                    <MDBCol md='6' className='lastNameInput'>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Last Name'
                            size='lg'
                            id='form2'
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </MDBCol>
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Your Email'
                        size='lg'
                        id='form3'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Password'
                        size='lg'
                        id='form4'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <MDBInput
                        wrapperClass='mb-4'
                        label='Repeat your password'
                        size='lg'
                        id='form5'
                        type='password'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </MDBRow>
                <div className='roleLabel'>
                    <h6 className=''>用戶身份:</h6>
                    <MDBRadio
                        name='inlineRadio'
                        id='inlineRadio3'
                        value='option3'
                        label='需要人士'
                        inline
                    />
                    <MDBRadio
                        name='inlineRadio'
                        id='inlineRadio1'
                        value='option1'
                        label='義工'
                        inline
                    />
                    <MDBRadio
                        name='inlineRadio'
                        id='inlineRadio2'
                        value='option2'
                        label='捐贈者'
                        inline
                    />
                    <MDBRadio
                        name='inlineRadio'
                        id='inlineRadio2'
                        value='option2'
                        label='非牟利機構'
                        inline
                    />
                </div>
                <div className='d-flex justify-content-end pt-3'>
                    <MDBBtn color='light' size='lg'>
                        Reset all
                    </MDBBtn>
                    <MDBBtn className='ms-2' color='warning' size='lg' onClick={handleRegister}>
                        Submit form
                    </MDBBtn>
                </div>
            </MDBCardBody>
        </MDBContainer>
    );
};

export default Register;