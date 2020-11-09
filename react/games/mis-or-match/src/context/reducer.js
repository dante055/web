import { RandomValuesArr } from '../utilities/utils';

const initialState = {
  flipCount: 0,
  timeRemaining: 10,
  dificulty: 'easy',
  showGameStartScreen: true,
  showGameEndScreen: false,
  deck: [],
  firstCard: null,
  secondCard: null,
  //   showGameMainScreen: false,
};

const reducer = (state, action) => {
  const {
    type,
    showGameStartScreen,
    showGameEndScreen,
    firstCard,
    secondCard,
  } = action;
  switch (type) {
    case 'EASY':
      return { ...state, dificulty: 'easy' };
    case 'MEDIUM':
      return { ...state, dificulty: 'medium' };
    case 'HARD':
      return { ...state, dificulty: 'hard' };
    case 'SET_GAME_STATE':
      return {
        ...state,
        showGameStartScreen:
          typeof showGameStartScreen !== 'undefined'
            ? showGameStartScreen
            : state.showGameStartScreen,
        showGameEndScreen:
          typeof showGameEndScreen !== 'undefined'
            ? showGameEndScreen
            : state.showGameEndScreen,
      };
    case 'SET_INITIAL_DECK':
      return { ...state, deck: RandomValuesArr(state.dificulty) };
    case 'SET_DECK':
      return { ...state, deck: action.deck };
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case 'SET_FLIPS_COUNT':
      return { ...state, flipCount: state.flipCount + 1 };
    case 'SET_FIRST_CARD':
      return { ...state, firstCard: firstCard };
    case 'SET_SECOND_CARD':
      return { ...state, secondCard: secondCard };
    case 'RESET':
      return {
        ...state,
        timeRemaining: initialState.timeRemaining,
        flipCount: initialState.flipCount,
        firstCard: initialState.firstCard,
        secondCard: initialState.secondCard,
        deck: RandomValuesArr(state.dificulty),
      };

    default:
      return state;
  }
};

export { initialState, reducer };
