import React from 'react'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Switch, Route, Redirect} from 'react-router-dom';

// 按路由拆分代码
import Loadable from 'react-loadable';


import store from '../store/Store';
import Loading from '../views/components/loading/loading'


/*----加载时动画组件-----*/
const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
      return <Loading loading={isLoading} />;
  }
  // Handle the error state
  else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
      return null;
  }
};

/*---------按需加载组件---------------*/
const Index = Loadable({
  loader: () => import('../views/index'),
  loading: loadingComponent
});

const Detail= Loadable({
  loader: () => import('../views/detail'),
  loading: loadingComponent
});

const Login= Loadable({
  loader: () => import('../views/login'),
  loading: loadingComponent
});
const Product= Loadable({
  loader: () => import('../views/product'),
  loading: loadingComponent
});
const Regist= Loadable({
  loader: () => import('../views/regist/regist'),
  loading: loadingComponent
});
const Seller= Loadable({
  loader: () => import('../views/userInfo/user'),
  loading: loadingComponent
});
const UserSet= Loadable({
  loader: () => import('../views/userSet'),
  loading: loadingComponent
});

//认证路由
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().loginInOutReducer.isLogin ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const RouteConfig= () =>
  <Switch>
		<Route path = "/"  exact render = {() => <Redirect to = "/index" />} key = "first" />
		<Route path= "/index" component = {Index} key = "list" exact />
		<Route path="/detail/:id" component = {Detail} key = "detail" />
		<Route path="/product" component = {Product} key = 'info' />
		<Route path="/login" component = {Login} key = 'login' />
		<Route path="/regist" component = {Regist} key = 'regist' />
		<Route path="/seller/:id" component={Seller} key='seller'/>
    <PrivateRoute path="/userSet" component={UserSet} key="userSet" />
	</Switch>
export default RouteConfig 