import { cardDetaildObjArr } from './images';
const shuffle = require('shuffle-array');

const initialTimeRemaining = 100;

const initialFilp = 0;

const defaultDificulty = 'easy';

const difficultyLevel = {
  easy: 16,
  medium: 24,
  hard: 32,
};

const RandomValuesArr = dificulty => {
  const reducer = (acc, currValue, currIndex) => {
    let cardDetaildObj =
      cardDetaildObjArr[currIndex % cardDetaildObjArr.length];
    let cardPairs = new Array(2).fill().map(() => {
      return cardDetaildObj;
    });
    return [...acc, ...cardPairs];
  };

  const cardsArray = new Array(difficultyLevel[dificulty] / 2)
    .fill()
    .reduce(reducer, []);

  return shuffle(cardsArray);
  return cardsArray.sort(() => Math.random() - 0.5);
};

export {
  initialTimeRemaining,
  initialFilp,
  defaultDificulty,
  difficultyLevel,
  RandomValuesArr,
};
