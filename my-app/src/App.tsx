import { useEffect, useState } from "react";
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import UploadPage from "./Page/UploadPage";
import DonateItemPage from "./Page/DonateItemPage";
import RegisterForm from "./Components/Register";
import TransactionPage from "./Components/TransactionPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Nav, Button, NavbarBrand } from "react-bootstrap";
import { LoginForm } from "./Components/LoginForm";
import { AuthGuard } from "./utils/authGuard";
import { getUserInfo } from "./hook/userAPI";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "./store";
import { loginSuccess, logout } from "./slice/authSlice";
import FinalConfirmPage from "./Components/FinalConfirmPage";
import banner from "./image/pexels-matthias-zomer-339620.jpg"
// --------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === "/";
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)
  const navigate = useNavigate();
  const userData = useSelector((state: IRootState) => state.auth.userData);
  const [username, setUserName] = useState('')
  // ------------------

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          dispatch(loginSuccess(userData.eng_given_name));
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
        });
    }
  }, [dispatch]);

  // --------------
  useEffect(() => {
    if (userData?.eng_given_name) {
      setUserName(userData?.eng_given_name);
      sessionStorage.setItem("user", JSON.stringify({ user: userData?.eng_given_name }))
    }
    else {
      let name = '';
      try {
        name = JSON.parse(sessionStorage.getItem("user") || '{}')?.user;
      } catch (error) { }
      if (name) {
        setUserName(name);
      }
    }
  }, [userData?.eng_given_name])
  // ---------------------

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token');
    navigate('/')
  };

  // ------------------
  console.log('userData?.eng_given_name', userData?.eng_given_name)
  return (
    <div className="bigContainer">
      {/* <div className="welcomePage">
        <img src={banner} alt="Matthias Zomer" id="banner" />
      </div> */}
      <nav className="banContainer">
        <Nav.Link id="shopName" onClick={() => navigate('/')} > shopName</Nav.Link>
        <Nav.Item className="logIn_logOutBtn">
          <NavBarControl />
          {isLoggedIn ? (
            <div className="logInStatus">
              <p>Welcome, <b>{username}</b>!</p>
              <Button className="logOutBtn" variant="dark" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="logInStatus">
              <Button className="logInBtn" variant="secondary" onClick={() => navigate('/login')}>Login</Button>
            </div>
          )}
        </Nav.Item>

      </nav>

      {/* {
        shouldShowNavBar && (
          <div className="NavBarContainer">
            <NavBarControl />
          </div>
        )
      } */}
      {
        shouldShowWelcomePage && (
          ""
        )
      }

      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/Donate" element={<DonateItemPage />} />
        <Route path="/Transaction" element={<TransactionPage />} />
        <Route path="/" element={""} />
        <Route path="/FinalConfirmPage" element={<FinalConfirmPage />} />
        <Route element={<AuthGuard />} >

          <Route path="/Upload" element={<UploadPage />} />

        </Route>
      </Routes>

      <br />

    </div >
  );
}

export default App;
