import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  loading: true,
  post: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESSFULL':
      return {
        loading: false,
        post: action.payload,
        error: '',
      };
    case 'FETCH_UNSUCCESSFULL':
      return {
        loading: false,
        post: {},
        error: `${action.error.name} : ${action.error.message}`,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const initialState2 = {
  id: 1,
  idOnClick: 1,
};

const reducer2 = (state, action) => {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.id };
    case 'SET_CLICK_ID':
      return { ...state, idOnClick: state.id };
    case 'RESET':
      return initialState2;
    default:
      return state;
  }
};

function ReducerPlusFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateId, dispatch2] = useReducer(reducer2, initialState2);

  useEffect(() => {
    console.log('Running the effect');
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${stateId.idOnClick}`)
      .then(response => {
        dispatch({ type: 'FETCH_SUCCESSFULL', payload: response.data });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_UNSUCCESSFULL', error: err });
      });
  }, [stateId.idOnClick]);

  const handleClick = () => {
    dispatch({ type: 'RESET' });
    dispatch2({ type: 'SET_CLICK_ID' });
  };

  return (
    <div>
      <input
        type='number'
        value={stateId.id}
        onChange={e => dispatch2({ type: 'SET_ID', id: e.target.value })}
      />
      <button onClick={handleClick}>Fetch</button>
      <h2>
        {state.loading ? 'Loading...' : state.post.title}
        {state.error ? state.error : null}
      </h2>
    </div>
  );
}
// function ReducerPlusFetch() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [id, setId] = useState('1');
//   const [idOnClick, setIdOnClick] = useState('1');

//   useEffect(() => {
//     console.log('Running the effect');
//     axios
//       .get(`https://jsonplaceholder.typicode.com/posts/${idOnClick}`)
//       .then(response => {
//         dispatch({ type: 'FETCH_SUCCESSFULL', payload: response.data });
//       })
//       .catch(err => {
//         dispatch({ type: 'FETCH_UNSUCCESSFULL', error: err });
//       });
//   }, [idOnClick]);

//   const handleClick = () => {
//     dispatch({ type: 'RESET' });
//     setIdOnClick(id);
//   };

//   return (
//     <div>
//       <input type='number' value={id} onChange={e => setId(e.target.value)} />
//       <button onClick={handleClick}>Fetch</button>
//       <h2>
//         {state.loading ? 'Loading...' : state.post.title}
//         {state.error ? state.error : null}
//       </h2>
//     </div>
//   );
// }

export default ReducerPlusFetch;
