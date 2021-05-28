import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import StoreState from './context/store/StoreState';
import CategoryState from './context/category/CategoryState';
import ProductState from './context/product/ProductState';

import Home from './components/page/Home';
import Categories from './components/page/Categories';
import Products from './components/page/Products';
import VirtualizedTable from './components/page/VirtualizedTable';

function App() {
  const { Header, Content } = Layout;
  return (
    <StoreState>
      <CategoryState>
        <ProductState>
          <Router>
            <Layout>
              <Content>
                <Switch>
                  <Route exact path='/table' component={VirtualizedTable} />
                  <Route exact path='/' component={Home} />
                  <Route exact path='/categories/:id/' component={Categories} />
                  <Route
                    exact
                    path='/categories/:storeId/products/:categoryId'
                    component={Products}
                  />
                </Switch>
              </Content>
            </Layout>
          </Router>
        </ProductState>
      </CategoryState>
    </StoreState>
  );
}

export default App;
