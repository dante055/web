import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/users/userActions';

function UserContainer({ userState: { loading, users, error }, fetchUsers }) {
  useEffect(() => {
    console.log('run effect');
    fetchUsers();
  }, []);

  const render = useRef(0);

  return (
    <>
      <h2>Renders : {render.current++}</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <h3>Users List</h3>
          <div>
            {users && users.map(user => <p key={user.id}>{user.name} /</p>)}
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return { userState: state.user };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
