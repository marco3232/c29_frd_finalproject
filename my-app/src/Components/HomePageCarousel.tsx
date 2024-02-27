import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner from "../image/homePage.png";
import banner2 from "../image/homePage2.png";
import banner3 from "../image/homePage3.png";
import { Carousel } from "react-responsive-carousel";

const MyCarousel = () => {
  return (
    <Carousel className='carouselContainer' autoPlay interval={5000} infiniteLoop showThumbs={false} showStatus={false} showArrows={false} stopOnHover={true} >
      <div>
        <img src={banner} alt="Image 1" />
      </div>
      <div>
        <img src={banner2} alt="Image 2" />
      </div>
      <div>
        <img src={banner3} />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
