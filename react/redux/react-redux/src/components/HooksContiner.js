import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux/cakes/cakeActions';

function HooksContiner() {
  const numOfCakes = useSelector(state => state.cake.numOfCakes);

  const distapch = useDispatch();
  const reders = useRef(0);

  return (
    <div>
      <h1>Numbers of cake (hooks) - {numOfCakes}</h1>
      <button onClick={() => distapch(buyCake())}>Bye Cake</button>
      <h3>Render Cakes {reders.current++}</h3>
    </div>
  );
}

export default HooksContiner;
