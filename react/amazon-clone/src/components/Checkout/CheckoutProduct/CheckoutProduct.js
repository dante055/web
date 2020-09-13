import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { products } from '../../../utils/products';
import { useStateValue } from '../../../context/StateProvider';
import styles from './CheckoutProduct.module.css';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { IconButton } from '@material-ui/core';
import SubTotal from '../SubTotal/SubTotal';

function CheckoutProduct({ id, quantity }) {
  const { dispatch } = useStateValue();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
        // const savedProducts = JSON.parse(sessionStorage.getItem('products'));
        // setProduct(savedProducts[id]);
      } catch (error) {
        setProduct(products[id]);
      }
    })();
  }, []);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_BASKET', itemId: id, price: product.price });
  };

  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_BASKET', itemId: id, price: product.price });
  };

  const removeFromCartCompletely = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET_COMPLETELY',
      itemId: id,
      price: product.price,
    });
  };

  return (
    <div className={styles.checkoutProduct}>
      <div className={styles.checkoutProduct_image}>
        <img src={product.image} alt='' />
      </div>
      <div className={styles.checkoutProduct_info}>
        <div className={styles.checkoutProduct_title}>{product.title}</div>
        <div className={styles.checkoutProduct_price}>
          <div className={styles.checkoutProduct_singlePoductPrice}>
            <span>Price : {product.price}</span>
            <span className={styles.checkoutProduct_priceSign}>$</span>
          </div>
        </div>
        <div className={styles.checkoutProduct_rating}>
          {Array(product.rating)
            .fill()
            .map((_, index) => (
              <span key={index}>🌟 </span>
            ))}
        </div>
        <div className={styles.checkoutProduct_quatity}>
          <span>Quantity : </span>
          <div className={styles.checkoutProduct_addRemoveQuatity}>
            <IconButton onClick={addToCart}>
              <AddCircleOutlineIcon />
            </IconButton>
            <span>{quantity}</span>
            <IconButton onClick={removeFromCart}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
        {quantity > 1 ? (
          <div className={styles.checkoutProduct_totalPoductPrice}>
            <span>SubTotal : {quantity * product.price}</span>
            <span className={styles.checkoutProduct_priceSign}>$</span>
          </div>
        ) : null}
        <div className={styles.checkoutProduct_removeButton}>
          <button onClick={removeFromCartCompletely}>Delete from Cart</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
