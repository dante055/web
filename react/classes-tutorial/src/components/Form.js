import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      comment: '',
      topic: 'react',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleCommentChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  handleTopicChange = (event) => {
    this.setState({
      topic: event.target.value,
    });
  };

  handleSubmitChange = (event) => {
    event.preventDefault();
    alert(this.state.username, this.state.topic, this.state.value);

    // Object.entries(event.target.elements).map((element) => {
    //   console.log(element[1].value);
    // });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitChange}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="comment">Commnet</label>
          <textarea
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
        </div>
        <div>
          <select value={this.state.topic} onChange={this.handleTopicChange}>
            <option value="vue">Vue</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
