import React from 'react';

/* function Greet() {
  return <h1>Hello Dante!</h1>;
} */

// const Greet = (props) => {
const Greet = ({ name, alias, children }) => {
  //   console.log(props);
  // how to loop throuch childrent of props
  React.Children.map(children, (element) => {
    if (React.isValidElement(element)) console.log(element);
  });

  console.log(name, alias, children);
  return (
    <div>
      <h1>
        {/* Hello {props.name} aka {props.alias} (Functional component) */}
        Hello {name} aka {alias} (Functional component)
      </h1>
      {/* {props.children} */}
      {children}
    </div>
  );
};

/* Named export */
// export const Greet = () => <h1>Hello Dante</h1>;
export { Greet };

/* default export */
// export default Greet;
