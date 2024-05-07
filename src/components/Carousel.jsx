import React from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css'

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block", background: "#6922fc" }}
      onClick={onClick}
    />
  );
}

const Carousel = ({ slidesToShow, slides, slideColors }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow || 3, // Default to 3 slides if not provided
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
  {slides.map((slide, index) => (
    <div className="slide" key={index} style={{ backgroundColor: slideColors[index] }}>
      <div className="slide-inner" style={{ backgroundColor: slideColors[index] }}>
        <h5>{slide.title}</h5>
        <div className="slideContent">
          <div>
            <h6>Target</h6>
            <h5>{slide.expense}</h5>
          </div>
          <div>
            <h6>Dead line</h6>
            <h5>{slide.date}</h5>
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>

    </div>
  );
};

export default Carousel;
