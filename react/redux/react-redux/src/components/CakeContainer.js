import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux/cakes/cakeActions';
import PropTypes from 'prop-types';

function CakeContainer({ numOfCakes, buyCake }) {
  const reders = useRef(0);
  return (
    <div>
      <h1>Numbers of cake - {numOfCakes}</h1>
      <button onClick={buyCake}>Bye Cake</button>
      <h3>Render Cakes {reders.current++}</h3>
    </div>
  );
}

CakeContainer.propTypes = {
  buyCake: PropTypes.func.isRequired,
  numOfCakes: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    numOfCakes: state.cake.numOfCakes,
  };
};

const mapDistatchToProps = dispatch => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
};

export default connect(mapStateToProps, mapDistatchToProps)(CakeContainer);

// export default connect(mapStateToProps, { buyCake })(CakeContainer);
