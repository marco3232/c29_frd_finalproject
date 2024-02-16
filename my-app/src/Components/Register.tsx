import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import { createUser } from "../hook/userAPI";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";

//-------------------------------------------------------------------------------------------

const RegisterForm = () => {
  const navigate = useNavigate();
  const [chiSurname, setChiSurname] = useState("");
  const [chiGivenName, setchiGivenName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>();

  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        text: "Registration successful",
        icon: "success",
        showConfirmButton: false,
      });

      navigate("/");
    },
    onError: (data) => {
      Swal.fire({
        text: data.message,
        icon: "error",
        showConfirmButton: true,
      });
    },
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordInput1 = password;
    const passwordInput2 = confirmPassword;

    if (passwordInput1 !== passwordInput2) {
      return Swal.fire({
        text: "The password does not match!",
        icon: "error",
        showConfirmButton: true,
      });
    }
    if (!email) {
      return Swal.fire({
        text: "Email cannot be empty",
        icon: "error",
        showConfirmButton: true,
      });
    }
    if (!phoneNumber) {
      return Swal.fire({
        text: "Phone number cannot be empty",
        icon: "error",
        showConfirmButton: true,
      });
    }
    try {
      const formData = { firstName, lastName, password, email, phoneNumber };
      mutate(formData);
    } catch (error: any) {
      console.log(error);
      console.error("Error during registration:", error);
      if (error.message === "Email already exists") {
        alert("Email already exists. Please use a different email address.");
      } else {
        alert("Error during registration: " + error.message);
      }
    }
  };

  return (
    <MDBContainer fluid className="RegisterFormContainer">
      <MDBCardBody className="RegisterFormBody">
        <h3 className="registerTitle">Registration </h3>
        <form className="registerFormFetch" onSubmit={handleRegister}>
          <MDBRow>
            <MDBCol md="6" className="firstNameInput">
              <MDBInput
                wrapperClass="mb-4"
                label="First Name　　　　(Option)"
                size="lg"
                id="form1"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </MDBCol>
            <MDBCol md="6" className="lastNameInput">
              <MDBInput
                wrapperClass="mb-4"
                label="Last Name　　　　(Option)"
                size="lg"
                id="form2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBCol>
            <MDBCol md="6" className="lastNameInput">
              <MDBInput
                wrapperClass="mb-4"
                label="Last Name　　　　(Option)"
                size="lg"
                id="form2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBCol>
            <MDBCol md="6" className="lastNameInput">
              <MDBInput
                wrapperClass="mb-4"
                label="Last Name　　　　(Option)"
                size="lg"
                id="form2"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </MDBCol>
            <MDBInput
              wrapperClass="mb-4"
              label="Your Email"
              size="lg"
              id="form3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Phone Number"
              size="lg"
              id="form3"
              type="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form4"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm your password"
              size="lg"
              id="form5"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </MDBRow>
          <div className="roleLabel">
            <h6 className="">用戶身份:</h6>
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio3"
              value="option3"
              label="需要人士"
              inline
            />
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio1"
              value="option1"
              label="義工"
              inline
            />
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio2"
              value="option2"
              label="捐贈者"
              inline
            />
            <MDBRadio
              name="inlineRadio"
              id="inlineRadio2"
              value="option2"
              label="非牟利機構"
              inline
            />
          </div>
          <div className="submitContainer   ">
            <MDBBtn id="resetBtn" color="danger" size="lg">
              Reset all
            </MDBBtn>
            <MDBBtn type="submit" id="submitBtn" color="info" size="lg">
              Submit form
            </MDBBtn>
          </div>
        </form>
      </MDBCardBody>
    </MDBContainer>
  );
};

export default RegisterForm;
