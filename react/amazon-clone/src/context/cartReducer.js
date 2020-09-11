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
  switch (type) {
    case 'ADD_TO_BASKET':
      let tempCart;
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
      // remove from basket
      break;
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
