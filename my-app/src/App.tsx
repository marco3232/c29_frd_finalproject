import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import UploadPage from './Page/UploadPage';
import DonateItemPage from "./Page/DonateItemPage";
import RegisterForm from "./Components/Register";
import TransactionPage from "./Components/TransactionPage";
import { LoginForm } from "./Components/LoginForm";
import { AuthGuard } from "./utils/authGuard";
import { useState } from "react";
import { Nav, Button } from "react-bootstrap";




// --------------------------------------------------------------------------------

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === "/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  function logInNavigate() {
    navigate("/login")
  }



  return (
    <div className="bigContainer">
      <nav>
        <Nav.Item>
          <Button variant="warning" onClick={logInNavigate}>
            Login
          </Button>
          {"\u00A0\u00A0"}
          {"\u00A0\u00A0"}
          <Button variant="warning" onClick={() => ("")}>
            Logout
          </Button>
        </Nav.Item>
      </nav>
      {
        shouldShowNavBar && (
          <div className="NavBarContainer">
            <NavBarControl />
          </div>
        )
      }
      {
        shouldShowWelcomePage && (
          <div className="welcomePage">
            <img
              id="welcomeGif"
              alt="gif"
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Qzbzl3bnZteTVwbDVmOWwzbDBucW56NG5pcHgwbDR5ejY5MjNwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tPplGWjN0xLybiU/giphy.gif"
            ></img>
          </div>
        )
      }


      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/Upload" element={<UploadPage />} />
        <Route path="/Donate" element={<DonateItemPage />} />
        <Route path="/Transaction" element={<TransactionPage />} />


        <Route path="/" element={""} />
        <Route element={<AuthGuard />}>
        </Route>
      </Routes>

      <br />

    </div >
  );
}

export default App;
