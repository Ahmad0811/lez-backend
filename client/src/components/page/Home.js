import React, { useState, useContext, useEffect, Fragment } from 'react';

import StoreContext from '../../context/store/storeContext';
import 'antd/dist/antd.css';

import { Row, Col, Button } from 'antd';

import StoreItem from '../layout/StoreItem';

import ModalCreateForm from '../layout/modal';
import Nav from '../layout/Nav';

const Home = () => {
  const storeContext = useContext(StoreContext);
  const { stores, loading, getStores, addStore } = storeContext;

  useEffect(() => {
    return getStores();
  }, []);

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    addStore(values);
    setVisible(false);
  };

  return (
    <Fragment>
      <Nav type='Stores' />
      <ModalCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        type='Store'
      />
      <Button
        type='primary'
        block
        onClick={() => {
          setVisible(true);
        }}
      >
        Add
      </Button>
      <Row gutter={[10, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {stores.length > 0 ? (
          stores.map((store) => (
            <Col className='gutter-row' span={4}>
              <StoreItem data={store} type='Store' />
            </Col>
          ))
        ) : (
          <div>empty</div>
        )}
      </Row>
    </Fragment>
  );
};

export default Home;
