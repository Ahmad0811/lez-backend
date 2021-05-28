import React, { useState, useContext, useEffect, Fragment } from 'react';

import ProductContext from '../../context/product/productContext';
import 'antd/dist/antd.css';

import { useParams } from 'react-router';

import { Row, Col, Button } from 'antd';

import Nav from '../layout/Nav';

import StoreItem from '../layout/StoreItem';

import ModalCreateForm from '../layout/modal';

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products, loading, addProduct, getProducts } = productContext;

  const { storeId, categoryId } = useParams();

  useEffect(() => {
    return getProducts(storeId, categoryId);
  }, []);

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    addProduct(values, storeId, categoryId);
    setVisible(false);
  };

  return (
    <Fragment>
      <Nav type='Products' />
      <ModalCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        type='Product'
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
        {products.length > 0 ? (
          products.map((product) => (
            <Col className='gutter-row' span={4}>
              <StoreItem data={product} type='Product' />
            </Col>
          ))
        ) : (
          <div>empty</div>
        )}
      </Row>
    </Fragment>
  );
};

export default Products;
