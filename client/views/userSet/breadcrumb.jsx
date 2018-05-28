import React from 'react';
import {  Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const routes = [{
  path: '/userSet/set',
  breadcrumbName: '首页'
}, {
  path: '/userSet/intro',
  breadcrumbName: '个性签名'
}, {
  path: '/userSet/changepwd',
  breadcrumbName: '当前页面'
},
{
  path: '/userSet/my/sellOrderList',
  breadcrumbName: '订单处理'
},
];
function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  console.log(route, params, routes, paths);
  return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
}
const MyBreadcrumb = ({location}) => {
	return (
		<Breadcrumb className="bread_crumb" itemRender={itemRender} routes={routes}/>
	)
}
export default MyBreadcrumb
