import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    const renderBoldChildren = () => {
      return React.Children.map(this.props.children, (element) => {
        console.log(element, element.props.id, element.props.className);
        // if (element.type == 'b') return element;
        // if (element.props.id == 'testId') return element;
        if (element.props.className === 'bold') return element;
      });
    };

    return (
      <div>
        <h1>
          Welcome {this.props.name} aka {this.props.alias} (Class Component)
        </h1>
        {/* {this.props.children} */}
        {renderBoldChildren()}
        {/* <h1>Welcome Dante (Class Component)</h1> */}
      </div>
    );
  }
}

export default Welcome;
