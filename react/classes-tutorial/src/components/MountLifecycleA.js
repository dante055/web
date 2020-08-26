import React, { Component } from 'react';
import MountLifecycleB from './MountLifecycleB';

class MountLifecycleA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'dante',
      count: 0,
    };
    console.log('LifecycleA constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('LifecycleA getDerievedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('LifecycleA componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('LifecycleA shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log('LifecycleA getSnapshotBeforUpdate');
    return null;
  }

  componentDidUpdate() {
    console.log('LifecycleA componentDidUpdate');
  }

  render() {
    console.log('LifecycleA render');
    return (
      <div>
        <h1>LifeCycle A</h1>
        <p>count parent : {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          increment count
        </button>
        <MountLifecycleB count={this.state.count} />
      </div>
    );
  }
}

export default MountLifecycleA;
