import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux/cakes/cakeActions';
import { buyIceCream } from '../redux/iceCreams/iceCreamActions';

function ItemContainer(props) {
  const render = useRef(0);

  const item = props.cake ? 'Cake' : 'Ice-cream';

  // when not using mapDispatch to props
  const buyItem = props.cake ? props.buyCake : props.buyIceCream;

  return (
    <div>
      <h2>
        Item {item} - {props.item}
      </h2>
      <button onClick={() => buyItem()}>Buy {item}</button>
      {/* <button onClick={props.buyItem}>Buy {item}</button> */}
      <h3>Item render times - {render.current++}</h3>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.iceCream.numOfIceCreams;

  return {
    item: itemState,
  };
};

const mapDistatchToProps = (dispatch, ownProps) => {
  const dispatchFunction = ownProps.cake
    ? () => dispatch(buyCake())
    : () => dispatch(buyIceCream());

  return {
    buyItem: dispatchFunction,
  };
};

// export default connect(mapStateToProps, mapDistatchToProps)(ItemContainer);

export default connect(mapStateToProps, { buyCake, buyIceCream })(
  ItemContainer
);
