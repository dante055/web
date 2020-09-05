import React from 'react';
import Slider from 'react-slick';
import './css/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function importAll(r) {
  let images = {};
  r.keys().map(item => (images[item.replace('./', '')] = r(item)));
  return images;
}

function App() {
  const images = importAll(
    require.context('./images', false, /\.(png|jpe?g|svg)$/)
  );
  const imageKeys = Object.keys(images);

  const settings1 = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: 'slides',
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    className: 'slides2',
  };

  return (
    <div className='app'>
      <Slider {...settings1}>
        {imageKeys.map(image => {
          return (
            <div className='app_imageContainer' key={image}>
              <img className='app_image' src={images[image]} alt='' />
            </div>
          );
        })}
      </Slider>

      <div className='app_imageContainer2'>
        <Slider {...settings2}>
          {imageKeys.map(image => {
            return (
              <div key={image} className='app_imageContainer2_block'>
                <img className='app_image2' src={images[image]} alt='' />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default App;
