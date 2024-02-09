import { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBRadio,
} from 'mdb-react-ui-kit';
import { dataTagSymbol, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUsers } from '../hook/userAPI';
const source = "http://localhost:8080"

/* --------------------------------------------------------------------------------------------------------- */
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined)
    const [emailExists, setEmailExists] = useState(false);
    const queryClient = useQueryClient()
    const GetCreateUsers = useMutation({
        mutationFn: async (data: { firstName: string, lastName: string, email: string, password: string, phoneNumber: number }) => createUsers(data.firstName, data.lastName, data.password, data.email, data.phoneNumber),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
                exact: true
            })
        }
    })

    //-------------------------------------------------------------------------------------------

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const passwordInput1 = password;
        const passwordInput2 = confirmPassword;


        async function checkEmailExists(email: string) {
            try {
                const response = await fetch(`${source}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email })
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.exists;
                } else {
                    throw new Error('Failed to check email existence');
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        }

        if (passwordInput1 !== passwordInput2) {
            return alert("The password does not match!");
        }
        if (!email) {
            return alert("Email cannot be empty");
        }
        if (!phoneNumber) {
            return alert("Phone number cannot be empty");
        }
        if (phoneNumber < 10000000) {
            return alert("Phone number must be 8 digits");
        } else {
            alert("Registered successfully");
        }

        try {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                return alert("email already exists!")
            } else {
                alert("register success")
                GetCreateUsers.mutate({ firstName, lastName, email, password, phoneNumber });
            }
        } catch {
            console.log(Error)
        }
    };

    return (
        <MDBContainer fluid className='RegisterFormContainer' >
            <MDBCardBody className='RegisterFormBody'>
                <h3 className='registerTitle'>Registration </h3>
                <form className="registerFormFetch" onSubmit={handleRegister}>
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
                            label='Phone Number'
                            size='lg'
                            id='form3'
                            type='phoneNumber'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(Number(e.target.value))}
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
                            label='Confirm your password'
                            size='lg'
                            id='form5'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <div className='submitContainer   '>
                        <MDBBtn id="resetBtn" color='danger' size='lg'>
                            Reset all
                        </MDBBtn>
                        <MDBBtn type="submit" id="submitBtn" color='info' size='lg'>
                            Submit form
                        </MDBBtn>
                    </div>
                </form>
            </MDBCardBody>
        </MDBContainer >
    );
}

export default RegisterForm;

