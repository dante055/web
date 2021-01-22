import { BUY_CAKE } from './cakeTypes';

/* export const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};
 */

export const buyCake = (number = 1) => {
  console.log(number, '---------------');
  return {
    type: BUY_CAKE,
    payload: number,
  };
};
