import React, { Component } from 'react';

const imgStyle = {
  height: '200px',
  width: '200px',
};

class ItemDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
    };
  }

  componentDidMount() {
    fetch(`https://fakestoreapi.com/products/${this.props.match.params.id}`)
      .then((response) => {
        response.json().then((item) => this.setState({ item }));
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { item } = this.state;
    console.log(item);
    return (
      <div>
        <h1>Item Detail</h1>
        <div>
          <img src={item.image} alt={item.title} style={imgStyle} />
        </div>
        <div>
          Title : {item.title} <br />
          Category : {item.category} <br />
          Description : {item.description} <br />
          Price : {item.price}
        </div>
      </div>
    );
  }
}

export default ItemDetail;
