import React, { useEffect, useState, useCallback } from 'react';
import Card from '../Card/Card';

import { useStateValue } from '../../context/StateProvider';

function GameMainScreen() {
  const {
    deck,
    dispatch,
    showGameStartScreen,
    timeRemaining,
    flipCount,
    firstCard,
    secondCard,
  } = useStateValue();

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL_DECK' });
  }, []);

  useEffect(() => {
    if (showGameStartScreen === false) {
      let interval = setInterval(function () {
        if (timeRemaining <= 0) {
          dispatch({ type: 'SET_GAME_STATE', showGameEndScreen: true });
          clearInterval(interval);
          return;
        }
        dispatch({ type: 'SET_TIME_REMAINING' });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timeRemaining, showGameStartScreen]);

  const flipCardTo = (cardIdx, faceUp, ...multiFlipArr) => {
    const tempDeck = deck.map(obj => Object.assign({}, obj));

    tempDeck[cardIdx].faceUp = faceUp;

    if (multiFlipArr.length) {
      multiFlipArr.forEach(arr => {
        const [cardIdx, faceUp] = arr;
        tempDeck[cardIdx].faceUp = faceUp;
      });
    }
    dispatch({ type: 'SET_DECK', deck: tempDeck });
  };

  const setMatchedAndFlip = (cardIdx1, cardIdx2) => {
    const tempDeck = deck.map(obj => Object.assign({}, obj));

    tempDeck[cardIdx1].matched = true;
    tempDeck[cardIdx2].matched = true;
    tempDeck[cardIdx2].faceUp = true;

    dispatch({ type: 'SET_DECK', deck: tempDeck });
  };

  const flipCard = cardIdx => {
    if (deck[cardIdx].matched) {
      return;
    }
    dispatch({ type: 'SET_FLIPS_COUNT' });

    if (firstCard === null) {
      dispatch({ type: 'SET_FIRST_CARD', firstCard: cardIdx });
      flipCardTo(cardIdx, true);
    } else if (firstCard === cardIdx) {
      dispatch({ type: 'SET_FIRST_CARD', firstCard: null });

      flipCardTo(cardIdx, false);
    } else if (secondCard === cardIdx) {
      dispatch({ type: 'SET_SECOND_CARD', secondCard: null });

      flipCardTo(cardIdx, false);
    } else if (firstCard !== null && secondCard === null) {
      const firstCardValue = deck[firstCard].value;
      const secondCardValue = deck[cardIdx].value;
      if (firstCardValue === secondCardValue) {
        setMatchedAndFlip(firstCard, cardIdx);
        dispatch({ type: 'SET_FIRST_CARD', firstCard: null });
      } else {
        flipCardTo(cardIdx, true);
        dispatch({ type: 'SET_SECOND_CARD', secondCard: cardIdx });
      }
    } else {
      flipCardTo(firstCard, false, [secondCard, false], [cardIdx, true]);

      dispatch({ type: 'SET_FIRST_CARD', firstCard: cardIdx });
      dispatch({ type: 'SET_SECOND_CARD', secondCard: null });
    }
  };

  const GameCards = () => {
    return deck.map((obj, index) => {
      return <Card key={index} {...obj} cardIdx={index} flipCard={flipCard} />;
    });
  };

  return (
    <div className='game-container'>
      <div className='game-info-container'>
        <div className='game-info-timeRemaining'>Time {timeRemaining}</div>
        <div className='game-info-flips'>Flips {flipCount}</div>
      </div>
      <div className='game-cards'>{GameCards()}</div>
    </div>
  );
}

export default GameMainScreen;
