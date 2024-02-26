import { useEffect, useState } from "react";
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import UploadPage from "./Page/UploadPage";
import DonateItemPage from "./Page/DonateItemPage";
import RegisterForm from "./Components/Register";
import TransactionPage from "./Page/TransactionPage";
import { Routes, Route, useNavigate, useLocation, Form } from "react-router-dom";
import { Nav, Button, Carousel } from "react-bootstrap";
import { LoginForm } from "./Components/LoginForm";
import { getUserInfo } from "./hook/userAPI";
import logo from "../src/image/老友所遺banner.png"
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./store";
import { loginSuccess, logout } from "./slice/authSlice";
import Admin from "./Components/Admin";
import banner from "./image/homePage.png"
import FinalConfirmPage from "./Page/FinalConfirmPage";
import { AuthGuard } from "./utils/authGuard";

import BodyContent from "./Components/HomePageContent";
import HomePageCarousel from "./Components/HomePageCarousel";
import { AboutUs } from "./Components/AboutUs";



// --------------------------------------------------------------------------------

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const shouldShowNavBar = location.pathname !== "/notFoundPage" && location.pathname !== "/login";
    const shouldShowWelcomePage = location.pathname === "/";
    const isLoggedIn = useSelector(
        (state: IRootState) => state.auth.isAuthenticated
    );
    const navigate = useNavigate();
    const userData = useSelector((state: IRootState) => state.auth.userData);
    const [username, setUserName] = useState("");
    // ------------------

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserInfo(token)
                .then((userData) => {
                    dispatch(loginSuccess(userData));
                    localStorage.setItem("userData", JSON.stringify(userData));
                    sessionStorage.setItem("username", userData?.eng_given_name);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                });
        }
    }, [dispatch]);

    // --------------
    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUserName(savedUsername);
        }
    }, []);


    useEffect(() => {
        if (userData?.eng_given_name) {
            setUserName(userData?.eng_given_name);
            sessionStorage.setItem(
                "user",
                JSON.stringify({ user: userData?.eng_given_name })
            );
        } else {
            let name = "";
            try {
                name = JSON.parse(sessionStorage.getItem("user") || "{}")?.user;
            } catch (error) { }
            if (name) {
                setUserName(name);
            }
        }
    }, [userData?.eng_given_name]);

    // ---------------------

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        sessionStorage.removeItem("username");
        navigate("/login");
    };

    // ------------------
    // console.log("userData?.eng_given_name", userData?.eng_given_name);
    return (
        <>
            <div className="bigContainer">
                <nav className="banContainer">
                    <Nav.Link>
                        <img id="homePageLogo" onClick={() => navigate('/')} src={logo}></img>
                    </Nav.Link>
                    <Nav.Item className="statusContainer">
                        {isLoggedIn ? (
                            <div className="logInStatus">
                                <p className="pWelcome"><b>{username}, 你好 !</b></p>
                                <Button className="logOutBtn" variant="dark" onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div className="logInStatus">
                                <Button className="logInBtn" variant="secondary" onClick={() => navigate('/login')}>Login</Button>
                            </div>
                        )}
                        <NavBarControl />
                    </Nav.Item>
                </nav>
                {shouldShowWelcomePage && (
                    <>
                        <div className="welcomePage">
                            <HomePageCarousel />
                            {/* <img src={banner} id="banner" /> */}
                        </div><div className="bodyContent">
                            <BodyContent />
                        </div></>
                )}
                <div className="contentWrapper">
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/Register" element={<RegisterForm />} />
                        <Route path="/Donate" element={<DonateItemPage />} />
                        <Route path="/Transaction" element={<TransactionPage />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/FinalConfirmPage" element={<FinalConfirmPage />} />
                        <Route element={<AuthGuard />}>
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/Upload" element={<UploadPage />} />
                        </Route>
                    </Routes>
                </div >
                <br />
            </div >
            <div className='footContainer'>
                <div className="footText">
                    <a>聯絡我們: +852-88888888</a>
                    <a> ©2024 老友所遺 </a>
                    {/* <a>社會福利署 : https://www.swd.gov.hk/tc/pubsvc/elderly/cat_commsupp/elderly_centres/ </a> */}
                </div>
            </div></>
    );
}

export default App;
