
import NotFoundImage from '../image/notFoundPage.gif';
import { useNavigate } from 'react-router-dom';

//-------------------------------------------------------------------------------------------

const NotFoundPage = () => {
    const navigate = useNavigate()
    const goBack = () => { navigate(-1) }
    return (
        <div className="notFoundContainer">
            <img id="notFoundImg" src={NotFoundImage} alt="Not Found" />

            <button className="goBackBtn" onClick={goBack}>Go Back</button>
        </div>
    );
};

export default NotFoundPage;