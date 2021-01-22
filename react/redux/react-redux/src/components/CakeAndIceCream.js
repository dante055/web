import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux/cakes/cakeActions';
import { buyIceCream } from '../redux/iceCreams/iceCreamActions';

function CakeAndIceCream() {
  const store = useSelector(state => state);

  const distapch = useDispatch();
  const reders = useRef(0);

  return (
    <div>
      <h1>
        Numbers of cake {store.cake.numOfCakes} and Number of ice cream{' '}
        {store.iceCream.numOfIceCreams}
      </h1>
      <button onClick={() => distapch(buyCake())}>Bye Cake</button>
      <button onClick={() => distapch(buyIceCream())}>Bye Ice-cream</button>
      <h3>Render Cakes {reders.current++}</h3>
    </div>
  );
}

export default CakeAndIceCream;
