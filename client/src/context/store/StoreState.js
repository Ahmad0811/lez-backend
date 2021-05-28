import React, { useReducer } from 'react';
import axios from 'axios';
import storeContext from './storeContext';
import storeReducer from './storeReducer';

import { GET_STORES } from '../types';

const StoreState = (props) => {
  const initialState = {
    stores: [],
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  const getStores = async () => {
    try {
      const res = await axios.get('/api/stores');
      dispatch({ type: GET_STORES, payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const addStore = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/stores', formData, config);

      getStores();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStore = async (id) => {
    try {
      const res = await axios.delete(`/api/stores/${id}`);

      getStores();
    } catch (err) {
      console.log(err);
    }
  };

  const editStore = async (formData, id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/stores/${id}`, formData, config);

      getStores();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <storeContext.Provider
      value={{
        stores: state.stores,

        error: state.error,
        loading: state.loading,
        getStores,
        addStore,
        deleteStore,
        editStore
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreState;
