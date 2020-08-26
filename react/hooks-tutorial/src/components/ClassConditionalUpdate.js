import React, { Component } from 'react';

class ClassConditionalUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      inputName: '',
    };
  }

  componentDidMount() {
    document.title = `You cicked ${this.state.count} times!`;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Updating the doccument title');
      document.title = `You cicked ${this.state.count} times!`;
    }
  }

  handleChange = e => {
    this.setState({ inputName: e.target.value });
  };

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.inputName}
          onChange={this.handleChange}
        />
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click {this.state.count}
        </button>
      </div>
    );
  }
}

export default ClassConditionalUpdate;
