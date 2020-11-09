import React from 'react';
import { useStateValue } from '../../context/StateProvider';

function DificultyLevel() {
  const { dificulty, dispatch } = useStateValue();
  return (
    <div className='difficulty-level'>
      <ul className='difficulty-level-choice'>
        <li
          className={dificulty === 'easy' && `difficulty-level--selected`}
          onClick={() => dispatch({ type: 'EASY' })}
        >
          Easy
        </li>
        <li
          className={dificulty === 'medium' && `difficulty-level--selected`}
          onClick={() => dispatch({ type: 'MEDIUM' })}
        >
          Medium
        </li>
        <li
          className={dificulty === 'hard' && `difficulty-level--selected`}
          onClick={() => dispatch({ type: 'HARD' })}
        >
          Hard
        </li>
      </ul>
    </div>
  );
}

export default DificultyLevel;
