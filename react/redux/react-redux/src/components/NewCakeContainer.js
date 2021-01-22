import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux/cakes/cakeActions';
import PropTypes from 'prop-types';

function NewCakeContainer({ numOfCakes, buyCake }) {
  const [number, setNumber] = useState(1);
  const reders = useRef(0);
  return (
    <div>
      <h1>Numbers of cake - {numOfCakes}</h1>
      <input
        type='number'
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <button onClick={() => buyCake(number)}>Bye Cake</button>
      <h3>Render Cakes {reders.current++}</h3>
    </div>
  );
}

NewCakeContainer.propTypes = {
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
    buyCake: number => dispatch(buyCake(number)),
  };
};

export default connect(mapStateToProps, mapDistatchToProps)(NewCakeContainer);

// export default connect(mapStateToProps, { buyCake })(NewCakeContainer);
