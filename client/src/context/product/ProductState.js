import React, { useReducer } from 'react';
import axios from 'axios';
import productContext from './productContext';
import productReducer from './productReducer';

import { GET_PRODUCTS } from '../types';

const ProductState = (props) => {
  const initialState = {
    products: [],
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async (storeId, categoryId) => {
    try {
      const res = await axios.get(
        `/api/stores/${storeId}/categories/${categoryId}/products`
      );
      //   console.log(res);
      dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (formData, storeId, categoryId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/stores/${storeId}/categories/${categoryId}/products`,
        formData,
        config
      );

      getProducts(storeId, categoryId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id, storeId, categoryId) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);

      getProducts(storeId, categoryId);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = async (formData, id, storeId, categoryId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/products/${id}`, formData, config);
      getProducts(storeId, categoryId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <productContext.Provider
      value={{
        products: state.products,
        error: state.error,
        loading: state.loading,
        getProducts,
        deleteProduct,
        addProduct,
        editProduct
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
