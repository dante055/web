import React from 'react';
import DificultyLevel from '../DificultyLevel/DificultyLevel';

function GameEndScreen() {
  return (
    /* gameEnd-screen--visible  */
    <div className='gameEnd-screen '>
      <div className='ovlerlay-gameOver-text'>GAME OVER</div>
      <div className='game-results'></div>
      <span className='restart-game'>Click to restart</span>
      <DificultyLevel />
    </div>
  );
}

export default GameEndScreen;
