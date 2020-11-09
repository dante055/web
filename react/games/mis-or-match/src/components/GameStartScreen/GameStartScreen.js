import React from 'react';
import DificultyLevel from '../DificultyLevel/DificultyLevel';

function GameStartScreen() {
  return (
    <div>
      {/* startUp-screen--visible */}
      <div className='startUp-screen '>
        <div className='overlay-text '>Click to Start</div>
        <DificultyLevel />
      </div>
    </div>
  );
}

export default GameStartScreen;
