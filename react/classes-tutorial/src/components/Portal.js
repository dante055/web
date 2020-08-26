import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  render() {
    return ReactDOM.createPortal(
      <h1>Portal Component</h1>,
      document.getElementById('portal-root')
    );
  }
}

export default Portal;
