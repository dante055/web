import React from 'react';
import Slider from 'react-slick';
import styles from './Banner.module.css';
import './BannerSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function importAll(items) {
  let images = {};
  items.keys().map(item => (images[item.replace('./', '')] = items(item)));
  return images;
}

function Banner() {
  const images = importAll(
    require.context('../../../images/banner', false, /\.(png|jpe?g|svg)$/)
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
    className: 'slides',
  };

  return (
    <Slider {...settings}>
      {imageKeys.map(image => {
        return (
          <div className={styles.banner_container} key={image}>
            <img className={styles.banner_image} src={images[image]} alt='' />
          </div>
        );
      })}
    </Slider>
  );
}

export default Banner;
