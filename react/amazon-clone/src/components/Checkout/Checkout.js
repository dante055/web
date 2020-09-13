import React from 'react';
import { useStateValue } from '../../context/StateProvider';
import styles from './Checkout.module.css';
import CheckoutHeader from './CheckoutHeader/CheckoutHeader';
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';

function Checkout() {
  const {
    cart: { basket, totalCartItems },
  } = useStateValue();
  const itemIds = Object.keys(basket);
  return (
    <div className={styles.checkout}>
      <CheckoutHeader />
      <div className={styles.checkout_basket}>
        {totalCartItems === 0 ? (
          <>
            <h1>Your Shopping basket is empty</h1>
            <p>
              You have no items in yor basket. To buy one or more items, click
              "Add to basket" next to the item.
            </p>
          </>
        ) : (
          <>
            <h1>Your Shopping basket</h1>
            {itemIds.map(id => (
              <CheckoutProduct
                key={id}
                id={id}
                quantity={basket[id].quantity}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
