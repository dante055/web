import React, { Component } from 'react';

class MountLifecycleB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'yash',
      countChild: 0,
    };
    console.log('LifecycleB constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('LifecycleB getDerievedStateFromProps');
    if (props.count > 0) {
      return {
        countChild: props.count * 5,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('LifecycleB componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('LifecycleB shouldComponentUpdate');
    // return false;
    return true;
  }

  getSnapshotBeforUpdate() {
    console.log('LifecycleB getSnapshotBeforUpdate');
    return null;
  }

  componentDidUpdate() {
    console.log('LifecycleB componentDidUpdate');
  }

  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     console.log('LifecycleB getSnapshotBeforUpdate', prevProps, prevState);
  //     if (prevProps.count != this.props.count)
  //       return { countChild: this.props.count * 10 };
  //     return null;
  //   }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     console.log(
  //       'LifecycleB componentDidUpdate',
  //       prevProps,
  //       prevState,
  //       snapshot
  //     );
  //     if (snapshot !== null && prevState.countChild != snapshot.countChild)
  //       this.setState({ countChild: snapshot.countChild });
  //   }

  render() {
    console.log('LifecycleB render');
    return (
      <div>
        <h2>LifeCycle B</h2>
        <p>count child: {this.state.countChild}</p>
      </div>
    );
  }
}

export default MountLifecycleB;
