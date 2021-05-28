import React from 'react';

import 'antd/dist/antd.css';

import { Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ModalCreateForm = ({
  visible,
  onCreate,
  onCancel,
  name,
  description,
  type,
  price
}) => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <Modal
      visible={visible}
      title={name ? `Update ${type}` : `Create a new ${type}`}
      okText={name ? 'Update' : 'Create'}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public'
        }}
      >
        <Form.Item
          name='name'
          label={`${type} Name`}
          rules={[
            {
              required: true,
              message: 'Please input store name'
            }
          ]}
        >
          <Input defaultValue={name ? name : ''} />
        </Form.Item>

        {type === 'Category' ? (
          <></>
        ) : type === 'Product' ? (
          <Form.Item name='price' label='Product Price'>
            <Input defaultValue={price ? price : ''} />
          </Form.Item>
        ) : (
          <Form.Item name='description' label='Store description'>
            <Input defaultValue={description ? description : ''} />
          </Form.Item>
        )}

        {name ? (
          <></>
        ) : (
          <Form.Item
            name='logo'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            <Upload name='logo' listType='picture' beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ModalCreateForm;
