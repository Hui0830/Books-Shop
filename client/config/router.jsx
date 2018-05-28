import React from 'react'

import {
	Route,
	Redirect,
	Switch
} from "react-router-dom"

import Detail from '../views/detail'
import Index from '../views/index'
import Product from '../views/product'
import Login from '../views/login'
import Regist from '../views/regist/regist'
import User from '../views/userInfo/user'
import UserSet from '../views/userSet'

/*const data = [
  
      {
        path:"/set",
        component: "PersonSet",
        content:"基本信息",
      },
      {
        path:"/intro",
        component: "Intro",
        content:"个性签名",
      },
      {
        path:"/changepwd",
        component: "Changepwd",
        content:"安全中心",
      },
      {
        path:"/my/sellOrderList",
        component: "SellOrderList",
        content:"订单处理",
      },
      {
        path:"mailFee",
        component: "MailFee",
        content:"运费设置",
      },
      {
        path:"/set/bankAccount",
        component: "BankAccount",
        content:"收款账号",
      },
      {
        path:"/my/orderList",
        component: "OrderList",
        content:"我的订单",
      },
      {
        path:"/address",
        component: "Address",
        content:"收货信息",
      },
      {
        path:"/shoppingCart",
        component: "ShoppingCart",
        content:"购物车",
      },
      {
        path:"/mysell",
        component: "Mysell",
        content:"我的出售",
      },
      {
        path:"/mysell",
        component: "Mysell",
        content:"我的仓库",
      },
      {
        path:"/mybuy",
        component: "Mybuy",
        content:"我的求购",
      },
      {
        path:"/commentList/:id",
        component: "CommentList",
        content:"留言-出售",
      },
      {
        path:"/commentList/:id",
        component: "CommentList",
        content:"留言-求购",
      },
      {
        path:"/commentList/:id",
        component: "CommentList",
        content:"留言-动态",
      }
]*/
export default () => [
		<Route path = "/"  exact render = {() => <Redirect to = "/index" />} key = "first" />,
		<Route path= "/index" component = {Index} key = "list" exact />,
		<Route path="/detail/:id" component = {Detail} key = "detail" />,
		<Route path="/product" component = {Product} key = 'info' />,
		<Route path="/login" component = {Login} key = 'login' />,
		<Route path="/regist" component = {Regist} key = 'regist' />,
		<Route path="/user" component={User} key='user' />,
		<Route path="/userSet"  component={UserSet} key="userSet" />,
		]
