import React from 'react';
import styles from './Product.module.css';
import { useStateValue } from '../../../context/StateProvider';

function Product({ id, title, price, rating, image }) {
  const { dispatch } = useStateValue();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_BASKET', itemId: id });
  };
  return (
    <div className={styles.product}>
      <div className={styles.product_info}>
        <div className={styles.product_title}>{title}</div>
        <div className={styles.product_price}>
          <span>{price}</span>
          <span className={styles.product_priceSign}>$</span>
        </div>
        <div className={styles.product_rating}>
          {Array(rating)
            .fill()
            .map((_, index) => (
              <span key={index}>🌟 </span>
            ))}
        </div>
        <div className={styles.product_image}>
          <img src={image} />
        </div>
        <div className={styles.product_button}>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
