import { useState, useEffect } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import banner from "../image/homePage.png";
import banner2 from "../image/homePage2.png";
import banner3 from "../image/homePage3.png";

export default function App() {
    const [activeItem, setActiveItem] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prevItem) => (prevItem === 3 ? 1 : prevItem + 1));
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <MDBCarousel activeItem={activeItem}>
            <MDBCarouselItem itemId={1}>
                <img src={banner} className='d-block w-100' alt='.....' />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
                <img src={banner2} className='d-block w-100' alt='...' />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
                <img src={banner3} className='d-block w-100' alt='...' />
            </MDBCarouselItem>
        </MDBCarousel>
    );
}