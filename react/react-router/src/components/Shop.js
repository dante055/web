import React, { Component } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        response.json().then((items) => this.setState({ items: items }));
      })
      .catch((error) => console.error(error));
  }

  render() {
    console.log(this.props);
    const { items } = this.state;
    const { url } = this.props.match;
    return (
      <div>
        {items.length ? (
          <React.Fragment>
            <h1>Welcome to the shop.</h1>
            {items.map((item) => (
              <Link to={`${url}/${item.id}`} key={item.id}>
                <h2>{item.title}</h2>
              </Link>
            ))}
          </React.Fragment>
        ) : (
          <h1>Currntly the shop is closed</h1>
        )}
      </div>
    );
  }
}

export default Shop;
