import React, { Component } from 'react';

class GreetingUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
    this.toggleIsLogIn = this.toggleIsLogIn.bind(this);
  }

  toggleIsLogIn() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  render() {
    // short cuircuit operator use to render either nothing or the statement taht should be rendered  if condition is true
    // return this.state.isLoggedIn && <h1>Welcome Dante</h1>;

    // if (this.state.isLoggedIn) {
    //   return <h1>Welcome Dante!</h1>;
    // } else {
    //   return <h1>Welcome User</h1>;
    // }

    // let message;
    // if (this.state.isLoggedIn) {
    //   message = <h1>Welcome Dante!</h1>;
    // } else {
    //   message = <h1>Welcome User</h1>;
    // }
    // return <div>{message}</div>;

    // return this.state.isLoggedIn ? (
    //   <h1>Welcome Dante!</h1>
    // ) : (
    //   <h1>Welcome Guest!</h1>
    // );

    // return <h1>Welcome {this.state.isLoggedIn ? 'Dante' : 'User'} </h1>;

    // return (
    //   <div>
    //     <h1>Welcome {this.state.isLoggedIn ? 'Dante' : 'User'} </h1>
    //     {this.state.isLoggedIn ? (
    //       <button onClick={() => this.setState({ isLoggedIn: false })}>
    //         Log Out
    //       </button>
    //     ) : (
    //       <button onClick={() => this.setState({ isLoggedIn: true })}>
    //         Log In
    //       </button>
    //     )}
    //   </div>
    // );

    return (
      <div>
        <h1>Welcome {this.state.isLoggedIn ? 'Dante' : 'User'} </h1>
        <button onClick={this.toggleIsLogIn}>
          {this.state.isLoggedIn ? 'Log In' : 'Log Out'}
        </button>
      </div>
    );
  }
}

export default GreetingUser;
