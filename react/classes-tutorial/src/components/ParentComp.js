import React, { Component, PureComponent } from 'react';
import RegularCom from './RegularCom';
import PureComp from './PureComp';
import MemoComp from './MemoComp';

class ParentComp extends Component {
  // class ParentComp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count });
    }, 2000);
  }

  render() {
    console.log('******Parent Component********');
    return (
      <div>
        <p>Parent Component</p>
        <p>count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Count++</button>
        {/* <RegularCom count={this.state.count} /> */}
        <PureComp count={this.state.count} />
        {/* <MemoComp count={this.state.count} /> */}
      </div>
    );
  }
}

export default ParentComp;
