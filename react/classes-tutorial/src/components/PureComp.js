import React, { PureComponent, Component } from 'react';

// class PureComp extends Component {
class PureComp extends PureComponent {
  render() {
    console.log('pure component');
    return <div>Pure Component {this.props.count}</div>;
  }
}

export default PureComp;
// export default React.memo(PureComp);
