import React, { useState } from 'react';
import uuid from 'react-uuid';
import Card from '../Card/Card';
import { imageSrc } from '../../utilities/images';
import { difficultyLevel } from '../../utilities/utils';

import { useStateValue } from '../../context/StateProvider';

function GameMainScreen() {
  const { dificulty, timeRemaining, flips, dispatch } = useStateValue();
  //   const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  return (
    <div className='game-container'>
      <div className='game-info-container'>
        <div className='game-info-timeRemaining'>Time {timeRemaining}</div>
        <div className='game-info-flips'>Flips {flips}</div>
      </div>
      <div className='game-cards'>
        {new Array(difficultyLevel[dificulty] / 2)
          .fill()
          .map((value, index) => {
            let souceImg = imageSrc[index % imageSrc.length];
            return new Array(2).fill().map(() => {
              return <Card key={uuid()} souceImg={souceImg} />;
            });
          })}
      </div>
    </div>
  );
}

export default GameMainScreen;
