import React, { useContext, Fragment, useState } from 'react';

import StoreContext from '../../context/store/storeContext';
import CategoryContext from '../../context/category/categoryContext';
import ProductContext from '../../context/product/productContext';

import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Card } from 'antd';
import { SettingTwoTone, DeleteTwoTone } from '@ant-design/icons';
import ModalCreateForm from './modal';

const { Meta } = Card;

const StoreItem = ({ data, type }) => {
  const storeContext = useContext(StoreContext);
  const { deleteStore, editStore } = storeContext;

  const categoryContext = useContext(CategoryContext);
  const { deleteCategory, editCategory } = categoryContext;

  const productContext = useContext(ProductContext);
  const { deleteProduct, editProduct } = productContext;

  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    type == 'Category'
      ? editCategory(values, data.category_id, data.store_id)
      : type == 'Product'
      ? editProduct(values, data.product_id, data.store_id, data.category_id)
      : editStore(values, data.store_id);
    setVisible(false);
    // console.log(type);
  };
  // console.log(data);
  return (
    <Fragment>
      <ModalCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        name={data.name}
        description={data.description}
        type={type}
        price={data.price}
      />
      <Card
        key={
          data.store_id
            ? data.store_id
            : data.category_id
            ? data.category_id
            : data.product_id
        }
        style={{ width: 250, paddingBlock: 10, cursor: 'pointer' }}
        cover={
          <img
            onClick={() => {
              if (type == 'Product') {
                return;
              }
              type == 'Category'
                ? history.push(
                    `/categories/${data.store_id}/products/${data.category_id}`
                  )
                : type == 'Store'
                ? history.push(`/categories/${data.store_id}`)
                : history.push(`/`);
            }}
            style={{ height: 150, width: 200, objectFit: 'scale-down' }}
            alt='example'
            src={data.logo}
          />
        }
        actions={[
          <DeleteTwoTone
            onClick={() => {
              type == 'Category'
                ? deleteCategory(data.category_id, data.store_id)
                : type == 'Product'
                ? deleteProduct(
                    data.product_id,
                    data.category_id,
                    data.store_id
                  )
                : deleteStore(data.store_id);
            }}
          />,
          <SettingTwoTone
            onClick={() => {
              setVisible(true);
            }}
          />
        ]}
      >
        <Meta
          title={data.name}
          description={
            data.description
              ? data.description
              : data.price
              ? data.price + '$'
              : ''
          }
        />
      </Card>
    </Fragment>
  );
};

export default StoreItem;
