import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import CategoryContext from '../../context/category/categoryContext';

import 'antd/dist/antd.css';
import ModalCreateForm from '../layout/modal';
import { Row, Col, Button, Modal, Form, Input, Upload } from 'antd';

import StoreItem from '../layout/StoreItem';

import Nav from '../layout/Nav';

const Categories = () => {
  const categoryContext = useContext(CategoryContext);
  const { categories, current, loading, getCategories, addCategory } =
    categoryContext;

  const { id } = useParams();

  useEffect(() => {
    return getCategories(id);
  }, []);

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    // addStore(values);
    addCategory(values, id);
    setVisible(false);
  };

  return (
    <Fragment>
      <Nav type='Categories' />
      <ModalCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        type='Category'
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
        {categories.length > 0 ? (
          categories.map((category) => (
            <Col className='gutter-row' span={4}>
              <StoreItem type='Category' data={category} />
            </Col>
          ))
        ) : (
          <div>empty</div>
        )}
      </Row>
    </Fragment>
  );
};

export default Categories;
