import React, { useReducer } from 'react';
import axios from 'axios';
import categoryContext from './categoryContext';
import categoryReducer from './categoryReducer';

import { GET_CATEGORIES } from '../types';

const CategoryState = (props) => {
  const initialState = {
    categories: [],
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = async (id) => {
    try {
      const res = await axios.get(`/api/stores/${id}/categories`);
      dispatch({ type: GET_CATEGORIES, payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = async (formData, id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        `/api/stores/${id}/categories`,
        formData,
        config
      );

      getCategories(id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id, storeId) => {
    try {
      const res = await axios.delete(`/api/categories/${id}`);

      getCategories(storeId);
    } catch (err) {
      console.log(err);
    }
  };

  const editCategory = async (formData, id, storeId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/categories/${id}`, formData, config);
      console.log(formData + ' Form');
      getCategories(storeId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <categoryContext.Provider
      value={{
        categories: state.categories,

        error: state.error,
        loading: state.loading,
        getCategories,
        deleteCategory,
        addCategory,
        editCategory
      }}
    >
      {props.children}
    </categoryContext.Provider>
  );
};

export default CategoryState;
