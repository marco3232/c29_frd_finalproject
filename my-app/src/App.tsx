import { useEffect, } from "react";
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
// --------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === "/";
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isAuthenticated)
  const navigate = useNavigate();
  const userData = useSelector((state: IRootState) => state.auth.userData);


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

  // ------------------

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token');
    navigate('/')
  };

  // ------------------

  return (
    <div className="bigContainer">
      <nav className="banContainer">
        <NavbarBrand>
          <Nav.Link id="shopName" onClick={() => navigate('/')} > shopName</Nav.Link>
        </NavbarBrand>
        <br />
        <Nav.Item className="logIn_logOutBtn">
          {isLoggedIn ? (
            <div className="logInStatus">
              <p>Welcome, {userData?.eng_given_name}!You are logged in.</p>
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