import React, { Component } from 'react';

class RegularCom extends Component {
  render() {
    console.log('regular component');
    return <div>Regular Component {this.props.count}</div>;
  }
}

export default RegularCom;
