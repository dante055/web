const cartInitialState = sessionStorage.getItem('cart')
  ? {
      cart: JSON.parse(sessionStorage.getItem('cart')),
    }
  : {
      cart: {
        basket: {}, // id: {quantity:}
        totalCartItems: 0,
      },
    };

const cartReducer = (state, action) => {
  const { type, itemId } = action;
  let tempCart;
  switch (type) {
    case 'ADD_TO_BASKET':
      if (state.cart.basket[itemId]) {
        tempCart = {
          basket: {
            ...state.cart.basket,
            [itemId]: { quantity: state.cart.basket[itemId].quantity + 1 },
          },
          totalCartItems: state.cart.totalCartItems + 1,
        };
      } else {
        tempCart = {
          basket: {
            ...state.cart.basket,
            [itemId]: { quantity: 1 },
          },
          totalCartItems: state.cart.totalCartItems + 1,
        };
      }
      sessionStorage.setItem('cart', JSON.stringify(tempCart));
      return { ...state, cart: JSON.parse(sessionStorage.getItem('cart')) };
    case 'REMOVE_FROM_BASKET':
      tempCart = {
        basket: {
          ...state.cart.basket,
          [itemId]: { quantity: state.cart.basket[itemId].quantity - 1 },
        },
        totalCartItems: state.cart.totalCartItems - 1,
      };
      if (tempCart.basket[itemId].quantity === 0) {
        delete tempCart.basket[itemId];
      }
      sessionStorage.setItem('cart', JSON.stringify(tempCart));
      return { ...state, cart: JSON.parse(sessionStorage.getItem('cart')) };
    case 'REMOVE_FROM_BASKET_COMPLETELY':
      tempCart = {
        ...state.cart,
        totalCartItems:
          state.cart.totalCartItems - state.cart.basket[itemId].quantity,
      };
      delete tempCart.basket[itemId];
      sessionStorage.setItem('cart', JSON.stringify(tempCart));
      return { ...state, cart: JSON.parse(sessionStorage.getItem('cart')) };
    default:
      return state;
  }
};

export { cartInitialState, cartReducer };

/* 
    const cartInitialState = {
        // basket: [],
        basket: {}, // id: {quantity:}
        totalCartItems: 0,
    }

    const cartReducer = (state, action) => {
        const { type, itemId } = action;
        switch (type) {
            case 'ADD_TO_BASKET':
                //   return { ...state, basket: [...state.basket, itemId] };
                if(state.basket[itemId]) {
                    return {
                    ...state,
                    basket: {
                        ...state.basket,
                        [itemId]: { quantity: state.basket[itemId].quantity + 1 },
                    },
                    totalCartItems: state.totalCartItems + 1,
                    };
                }
                else{
                    return {
                    ...state,
                    basket: {
                        ...state.basket,
                        [itemId]: { quantity: 1 },
                    },
                    totalCartItems: state.totalCartItems + 1,
                    };
                }
            case 'REMOVE_FROM_BASKET':
                // remove from basket
                break;
            default:
                return state;
        }
    }; 
*/
