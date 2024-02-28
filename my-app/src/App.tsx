import { useEffect, useState } from "react";
import NavBarControl from "./Components/NavBars";
import UploadPage from "./Page/UploadPage";
import DonateItemPage from "./Page/DonateItemPage";
import RegisterForm from "./Components/Register";
import TransactionPage from "./Page/TransactionPage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { LoginForm } from "./Components/LoginForm";
import logo from "../src/image/老友所遺banner.png"
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./store";
import { logout } from "./slice/authSlice";
import Admin from "./Components/Admin";
import FinalConfirmPage from "./Page/FinalConfirmPage";
import { AuthGuard } from "./utils/authGuard";
import BodyContent from "./Components/HomePageContent";
import HomePageCarousel from "./Components/HomePageCarousel";
import { AboutUs } from "./Components/AboutUs";
import { RentalPage } from "./Page/RentalPage";
import CheckOutTransactionPage from "./Page/CheckOutTransactionPage";
import { FinalCheckOutPage } from "./Page/FinalCheckOutPage";
import { AdminConfirmPage } from "./Page/AdminConfirmPage";



// --------------------------------------------------------------------------------

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const shouldShowAdminBtn = location.pathname !== "/notFoundPage" && location.pathname !== "/login";
    const shouldShowWelcomePage = location.pathname === "/";
    const isLoggedIn = useSelector(
        (state: IRootState) => state.auth.isAuthenticated
    );
    const isAdmin = useSelector((state: IRootState) => state.auth.role === 'admin')
    const navigate = useNavigate();
    const userData = useSelector((state: IRootState) => state.auth.userData);
    const [username, setUserName] = useState("");

    // ------------------

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

    return (
        <div className="bigContainer">
            <nav className="banContainer">
                <Nav.Link>
                    <img id="homePageLogo" onClick={() => navigate('/')} src={logo}></img>
                </Nav.Link>
                <Nav.Item className="statusContainer">
                    {isLoggedIn ? (
                        <div className="logInStatus">
                            <p className="pWelcome"><b>Welcome,{username}</b></p>
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
            {
                shouldShowWelcomePage && (
                    <>
                        <div className="welcomePage">
                            <HomePageCarousel />
                            {/* <img src={banner} id="banner" /> */}
                        </div><div className="bodyContent">
                            <BodyContent />
                        </div></>
                )
            }
            <div className="contentWrapper">
                <Routes>
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/Register" element={<RegisterForm />} />
                    <Route path="/Donate" element={<DonateItemPage />} />
                    <Route path="/Transaction" element={<TransactionPage />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/FinalConfirmPage" element={<FinalConfirmPage />} />
                    <Route path="/RentalPage" element={<RentalPage />} />
                    <Route path="/CheckoutTransaction" element={<CheckOutTransactionPage />} />
                    <Route path="/FinalCheckout" element={<FinalCheckOutPage />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/Upload" element={<UploadPage />} />
                        <Route path="/AdminConfirm/:id" element={<AdminConfirmPage />} />
                    </Route>
                </Routes>
                <div className='footContainer'>
                    <div className="footText">
                        <a>聯絡我們: +852-88888888</a>
                        <a> ©2024 老友所遺 </a>
                        {/* <a>社會福利署 : https://www.swd.gov.hk/tc/pubsvc/elderly/cat_commsupp/elderly_centres/ </a> */}
                    </div>
                </div>
            </div >
        </div>
    );
}

export default App;
