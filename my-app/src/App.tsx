import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import UploadPage from './Components/UploadPage';
import LoginForm from './Components/LoginForm';
import DonateItemPage from "./Components/DonateItemPage";
import RegisterForm from "./Components/Register";


// --------------------------------------------------------------------------------

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === "/";
  const user = "John";
  const isLoggedIn = true;

  return (
    <div className="bigContainer">
      {shouldShowNavBar && (
        <div className="NavBarContainer">
          <NavBarControl />
        </div>
      )}
      {shouldShowWelcomePage && (
        <div className="welcomePage">
          <img
            id="welcomeGif"
            alt="gif"
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Qzbzl3bnZteTVwbDVmOWwzbDBucW56NG5pcHgwbDR5ejY5MjNwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tPplGWjN0xLybiU/giphy.gif"
          ></img>
        </div>
      )}
      <Routes>
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/Upload" element={<UploadPage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Donate" element={<DonateItemPage />} />
        <Route path="/" element={""} />
      </Routes>
      <br />
    </div>
  );
}

export default App;
