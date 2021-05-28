import React from 'react';
import { PageHeader, Button } from 'antd';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
const Nav = ({ type }) => {
  const history = useHistory();
  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={type}
      extra={[
        <Button
          onClick={() => {
            history.push('/table');
          }}
          key='1'
        >
          Store Table
        </Button>,
        <Button
          onClick={() => {
            history.push('/');
          }}
          key='2'
        >
          Home
        </Button>
      ]}
    />
  );
};

export default Nav;
