import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { buyIceCream } from '../redux/iceCreams/iceCreamActions';
import PropTypes from 'prop-types';

function IceCreamContainer({ numOfIceCreams, buyIceCream }) {
  const reders = useRef(0);
  return (
    <div>
      <h1>Numbers of Ice Cream - {numOfIceCreams}</h1>
      <button onClick={buyIceCream}>Bye Ice-Cream</button>
      <h3>Render Ice-Creams {reders.current++}</h3>
    </div>
  );
}

IceCreamContainer.propTypes = {
  buyIceCream: PropTypes.func.isRequired,
  numOfIceCreams: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    numOfIceCreams: state.iceCream.numOfIceCreams,
  };
};

const mapDistatchToProps = dispatch => {
  return {
    buyIceCream: () => dispatch(buyIceCream()),
  };
};

export default connect(mapStateToProps, mapDistatchToProps)(IceCreamContainer);

// export default connect(mapStateToProps, { buyIceCream })(CakeContainer);
