import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import UploadPage from "./Page/UploadPage";
import DonateItemPage from "./Page/DonateItemPage";
import RegisterForm from "./Components/Register";
import TransactionPage from "./Components/TransactionPage";
import { LoginForm } from "./Components/LoginForm";
import { AuthGuard } from "./utils/authGuard";
import { useEffect, useState } from "react";
import { Nav, Button, Navbar } from "react-bootstrap";

// --------------------------------------------------------------------------------

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === "/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/')
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getUserInfo(token)
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
        });
    }
  }, []);



  return (
    <div className="bigContainer">
      <nav className="banContainer">
        <Navbar.Brand id="shopName" href="/">shopName</Navbar.Brand>
        <br />
        <Nav.Item className="logIn_logOutBtn">
          {isLoggedIn ? (
            <div className="logInStatus">
              <p>Welcome, {userData?.eng_surname}!You are logged in.</p>
              <Button variant="dark" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
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
        <Route path="/Donate" element={<DonateItemPage />} />
        <Route path="/Transaction" element={<TransactionPage />} />
        <Route path="/" element={""} />
        <Route element={<AuthGuard />} >

          <Route path="/Upload" element={<UploadPage />} />

        </Route>
      </Routes>

      <br />

    </div >
  );
}

export default App;
