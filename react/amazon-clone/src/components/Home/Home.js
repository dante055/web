import React, { useState, useEffect } from 'react';
import Banner from './Banner/Banner.js';
import styles from './Home.module.css';
import Product from './Product/Product.js';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  // const [startIndex, setStartIndex] = useState(0)
  // const [endIndex, setEndIndex] = useState(2)

  useEffect(() => {
    (async () => {
      try {
        if (!sessionStorage.getItem('products')) {
          const { data } = await axios.get(
            'https://fakestoreapi.com/products?limit=20'
          );
          sessionStorage.setItem('products', JSON.stringify(data));
          setProducts(data);
        } else {
          const products = JSON.parse(sessionStorage.getItem('products'));
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.home}>
      <Banner />
      <div className={styles.home_product}>
        {Array((products.length / 5) * 2)
          .fill()
          .map((_, index) => {
            let i;
            if (index % 2 === 0) {
              index > 0 ? (i = index * 2 + index / 2) : (i = index);
              return (
                <div key={index} className={styles.home_productRow}>
                  {products
                    .slice(i, i + 2)
                    .map(({ id, title, price, image }) => {
                      return (
                        <Product
                          key={id}
                          id={id}
                          title={title}
                          price={price}
                          rating={4}
                          image={image}
                        />
                      );
                    })}
                </div>
              );
            } else {
              index > 1
                ? (i = Math.floor(index * 2 + index / 2))
                : (i = index + 1);
              return (
                <div key={index} className={styles.home_productRow}>
                  {products
                    .slice(i, i + 3)
                    .map(({ id, title, price, image }) => {
                      return (
                        <Product
                          key={id}
                          id={id}
                          title={title}
                          price={price}
                          rating={4}
                          image={image}
                        />
                      );
                    })}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Home;

/* 
0 1       0       0-2
2 3 4     1       2-5
5 6       2       5-7
7 8 9     3       7-10
10 11     4       10-12
12 13 14  5       12- 15
15 16     6       15-17 
*/
