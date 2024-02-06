import { Route, Routes, useLocation } from 'react-router-dom';
import NotFoundPage from "./Page/NotFoundPage";
import NavBarControl from "./Components/NavBars";
import Register from './Components/Register';
import UploadPage from './Components/UploadPage';


// --------------------------------------------------------------------------------

function App() {
  const location = useLocation();
  const shouldShowNavBar = location.pathname !== "/notFoundPage";
  const shouldShowWelcomePage = location.pathname === '/';
  return (
    <div className="bigContainer">
      {shouldShowNavBar && (
        <div className='NavBarContainer'>
          <NavBarControl />
        </div>
      )
      }
      {shouldShowWelcomePage && (<div className="welcomePage">
        <img id="welcomeGif" alt="gif" src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Qzbzl3bnZteTVwbDVmOWwzbDBucW56NG5pcHgwbDR5ejY5MjNwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tPplGWjN0xLybiU/giphy.gif' ></img>
      </div>
      )
      }
      <Routes>
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Upload" element={<UploadPage />} />
        <Route path="/" element={""} />
      </Routes>
      <br />
    </div >
  )
}

export default App;
