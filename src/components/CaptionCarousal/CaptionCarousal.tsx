import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CaptionCarouselProps {
  captions: string[];
}

const CaptionCarousel: React.FC<CaptionCarouselProps> = ({ captions }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {captions.map((caption, index) => (
        <div key={index} className="carousel-slide">
          <p>{caption}</p>
        </div>
      ))}
    </Slider>
  );
};

export default CaptionCarousel;
