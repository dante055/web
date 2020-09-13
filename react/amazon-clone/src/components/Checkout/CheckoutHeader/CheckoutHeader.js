import React from 'react';
import Slider from 'react-slick';
import styles from './CheckoutHeader.module.css';
import './CheckoutSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function importAll(items) {
  let images = {};
  items.keys().map(item => (images[item.replace('./', '')] = items(item)));
  return images;
}
function CheckoutHeader() {
  const images = importAll(
    require.context('../../../images/checkout', false, /\.(png|jpe?g|svg)$/)
  );
  const imageKeys = Object.keys(images);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: 'checkoutSlides',
  };

  return (
    <Slider {...settings}>
      {imageKeys.map(image => {
        return (
          <div className={styles.checkoutHeader_container} key={image}>
            <img
              className={styles.checkoutHeader_image}
              src={images[image]}
              alt=''
            />
          </div>
        );
      })}
    </Slider>
  );
}

export default CheckoutHeader;
