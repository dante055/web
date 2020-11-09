import React from 'react';
import DificultyLevel from '../DificultyLevel/DificultyLevel';
import { useStateValue } from '../../context/StateProvider';

function GameEndScreen() {
  const { showGameEndScreen, dispatch } = useStateValue();

  return (
    <div
      className={`gameEnd-screen ${
        showGameEndScreen && 'gameEnd-screen--visible'
      }`}
    >
      <div className='ovlerlay-gameOver-text'>GAME OVER</div>
      <div className='game-results'></div>
      <span
        className='restart-game'
        onClick={() => {
          dispatch({ type: 'SET_GAME_STATE', showGameEndScreen: false });
          dispatch({ type: 'RESET' });
        }}
      >
        Click to restart
      </span>
      <DificultyLevel />
    </div>
  );
}

export default GameEndScreen;
