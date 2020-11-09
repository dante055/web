const initialState = {
  flips: 0,
  timeRemaining: 100,
  dificulty: 'easy',
};

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'EASY':
      return { ...state, dificulty: 'easy' };
    case 'MEDIUM':
      return { ...state, dificulty: 'medium' };
    case 'HARD':
      return { ...state, dificulty: 'hard' };
    case 'Flip':
      return { ...state, flips: state.flips++ };
    default:
      return state;
  }
};

export { initialState, reducer };
