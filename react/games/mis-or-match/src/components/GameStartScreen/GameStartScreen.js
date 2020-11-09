import React from 'react';
import DificultyLevel from '../DificultyLevel/DificultyLevel';
import { useStateValue } from '../../context/StateProvider';

function GameStartScreen() {
  const { showGameStartScreen, dispatch } = useStateValue();

  return (
    <div
      className={`startUp-screen ${
        showGameStartScreen && 'startUp-screen--visible '
      }`}
    >
      <div
        className='overlay-text '
        onClick={() => {
          dispatch({ type: 'SET_GAME_STATE', showGameStartScreen: false });
        }}
      >
        Click to Start
      </div>
      <DificultyLevel />
    </div>
  );
}

export default GameStartScreen;
