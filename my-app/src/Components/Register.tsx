


import RegisterImage from '../loadingGif.gif'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBRadio,
    // MDBSelect
} from 'mdb-react-ui-kit';

function Register() {
    return (
        <MDBContainer fluid className='RegisterFormContainer'>

            <MDBCardBody className='RegisterFormFirstContainer'>
                <h3 className="registerTitle">Registration </h3>

                <MDBRow>
                    <MDBCol md='6' className='firstNameInput'>
                        <MDBInput wrapperClass='mb-4' label='First Name' size='lg' id='form1' type='text' />
                    </MDBCol>
                    <MDBCol md='6' className='lastNameInput'>
                        <MDBInput wrapperClass='mb-4' label='Last Name' size='lg' id='form2' type='text' />
                    </MDBCol>
                    <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form3' type='email' />
                    <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password' />
                    <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password' />
                </MDBRow>
                <div className='roleLabel'>
                    <h6 className="">用戶身份:</h6>
                    <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='需要人士' inline />
                    <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='義工' inline />
                    <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='捐贈者' inline />
                    <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='非牟利機構' inline />
                </div>

                <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color='light' size='lg'>Reset all</MDBBtn>
                    <MDBBtn className='ms-2' color='warning' size='lg'>Submit form</MDBBtn>
                </div>
            </MDBCardBody>

        </MDBContainer >
    );

}

export default Register;