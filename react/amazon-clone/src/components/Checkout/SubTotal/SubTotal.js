import React from 'react';
import CurrencyFormat from 'react-currency-format';
import styles from './SubTotal.module.css';
import { Link } from 'react-router-dom';

function SubTotal({ totalCartItems, subTotal }) {
  return (
    <>
      <CurrencyFormat
        renderText={value => (
          <>
            <div className={styles.subTotal}>
              <span>
                Subtotal ({totalCartItems} items) : <strong>{value}</strong>
              </span>
              <small className={styles.subTotal_gift}>
                <input type='checkbox' />
                <span>This order contains a gift.</span>
              </small>
              <div className={styles.subTotal_payment}>
                <Link to='/payment'>
                  <button className={styles.subTotal_paymentButton}>
                    Proceed To Payment
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
        decimalScale={2}
        value={subTotal}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
    </>
  );
}

export default SubTotal;
