import React from 'react';
import './Card.css';
import { Cobweb, CobwebGrey, Spider } from '../../utilities/images';

function Card({ img, value, faceUp, matched, cardIdx, flipCard }) {
  const handleClick = () => {
    flipCard(cardIdx);
  };

  return (
    <div
      className={`card ${faceUp && 'card-front--visible'} ${
        matched && 'card--matched'
      }`}
      onClick={handleClick}
    >
      <div className='card-back card-face'>
        <img src={Cobweb} className='cob-web cob-web-top-left' />
        <img src={Cobweb} className='cob-web cob-web-top-right' />
        <img src={Cobweb} className='cob-web cob-web-bottom-left' />
        <img src={Cobweb} className='cob-web cob-web-bottom-right' />

        <img src={Spider} className='spider' />
      </div>
      <div className='card-front card-face'>
        <img src={CobwebGrey} className='cob-web cob-web-top-left' />
        <img src={CobwebGrey} className='cob-web cob-web-top-right' />
        <img src={CobwebGrey} className='cob-web cob-web-bottom-left' />
        <img src={CobwebGrey} className='cob-web cob-web-bottom-right' />

        <img src={img} alt={value} className='card-value' />
      </div>
    </div>
  );
}

export default Card;
