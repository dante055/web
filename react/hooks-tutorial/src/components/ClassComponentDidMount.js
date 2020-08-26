import React, { Component } from 'react';

class ClassComponentDidMount extends Component {
  state = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    console.log('adding the event listner');
    window.addEventListener('mousemove', this.logMousePosition);
  }

  logMousePosition = e => {
    console.log('Log mouse');
    this.setState({ x: e.clientX, y: e.clientY });
  };
  render() {
    return (
      <div>
        <h2>
          x: {this.state.x}, y: {this.state.y}
        </h2>
      </div>
    );
  }
}

export default ClassComponentDidMount;
