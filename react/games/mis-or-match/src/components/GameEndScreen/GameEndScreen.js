import React from 'react';
import DificultyLevel from '../DificultyLevel/DificultyLevel';
import { useStateValue } from '../../context/StateProvider';

function GameEndScreen() {
  const {
    showGameEndScreen,
    matchedCount,
    timeRemaining,
    flipCount,
    dispatch,
    gameResult,
  } = useStateValue();

  return (
    <div
      className={`gameEnd-screen ${
        showGameEndScreen && 'gameEnd-screen--visible'
      }`}
    >
      <div className='ovlerlay-gameOver-text'>GAME OVER</div>
      <div className='game-results'>
        <div
          className={`game-results-heading  ${
            gameResult === 'YOU WON' && 'game-results-heading--won'
          }`}
        >
          {gameResult}
        </div>
        <div className='game-results-info'>
          <span>Results</span>
          <div>
            <span>Marched Cards : {matchedCount}</span>
            <span>Filp Count : {flipCount}</span>
            <span>Time Remaining : {timeRemaining}</span>
          </div>
        </div>
      </div>
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
