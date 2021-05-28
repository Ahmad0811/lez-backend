import { GET_PRODUCTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };

    default:
      break;
  }
};
