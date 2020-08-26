import React from 'react';
// import './myStyle.css'; // grobaly scoped, ie every child component of StyleSheet compnent will have access to it
import styles from './myStyles.module.css'; // locally scoped

function StyleSheet(props) {
  //   const className = props.primary ? 'primary' : '';
  const className = props.primary ? styles.primary : '';
  return (
    <div>
      {/* <h1 className="primary">StyleSheet</h1> */}
      {/* <h1 className={className}>StyleSheet</h1> */}
      {/* <h1 className={`${className} font-xl`}>StyleSheet</h1> */}
      <h1 className={`${className} ${styles.fontXl}`}>StyleSheet</h1>
    </div>
  );
}

export default StyleSheet;
