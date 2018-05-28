import { Layout, Menu, Icon, Avatar, Breadcrumb, Badge } from 'antd';
import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter 
} from "react-router-dom"

require('./userSet.scss');
import SiderList from './siderList';

import Mysell from './book/Mysell';
import Mybuy from './book/Mybuy';
import CommentList from './mail/CommentList';
import BankAccount from './shop/BankAccount';
import MailFee from './shop/MailFee';
import SellOrderList from './shop/SellOrderList';
import Address from './shoppingCart/Address';
import OrderList from './shoppingCart/OrderList';
import ShoppingCart from './shoppingCart/shoppingCart';
import Changepwd from './user/Changepwd';
import Intro from './user/Intro';
import PersonSet from './user/Set'

import MyBreadcrumb from './breadcrumb'

const { Header, Sider, Content } = Layout;
const data = [
  {
    type: 'user',
    content: '个人设置',
    items: [
      {
        path:"/set",
        component: PersonSet,
        content:"基本信息",
      },
      {
        path:"/intro",
        component: Intro,
        content:"个性签名",
      },
    ]
  },
  {
    type: 'shop',
    content: '我是卖家',
    items: [
      {
        path:"/my/sellOrderList",
        component: SellOrderList,
        content:"订单处理",
      },
      {
        path:"/mailFee",
        component: MailFee,
        content:"运费设置",
      },
      {
        path:"/bankAccount",
        component: BankAccount,
        content:"收款账号",
      }
    ]
  },
  {
    type: 'shopping-cart',
    content: '我是买家',
    items: [
      {
        path:"/my/orderList",
        component: OrderList,
        content:"我的订单",
      },
      {
        path:"/address",
        component: Address,
        content:"收货信息",
      },
      {
        path:"/shoppingCart",
        component: ShoppingCart,
        content:"购物车",
      }
    ]
  },
  {
    type: 'book',
    content: '书籍管理',
    items: [
    {
        path:"/mysell",
        component: Mysell,
        content:"我的出售",
      },
      {
        path:"/mysell",
        component: Mysell,
        content:"我的仓库",
      },
      {
        path:"/mybuy",
        component: Mybuy,
        content:"我的求购",
      }
    ]
  },
  {
    type: 'mail',
    content: '留言中心',
    items: [
    {
        path:"/commentList/sell",
        component: CommentList,
        content:"留言-出售",
      },
      {
        path:"/commentList/buy",
        component: CommentList,
        content:"留言-求购",
      },
      {
        path:"/commentList/news",
        component: CommentList,
        content:"留言-动态",
      }
    ]
  },
]
const routes = [
  
      {
        path:"/set",
        component: PersonSet,
        content:"基本信息",
      },
      {
        path:"/intro",
        component: Intro,
        content:"个性签名",
      },
      {
        path:"/changepwd",
        component: Changepwd,
        content:"安全中心",
      },
      {
        path:"/my/sellOrderList",
        component: SellOrderList,
        content:"订单处理",
      },
      {
        path:"/mailFee",
        component: MailFee,
        content:"运费设置",
      },
      {
        path:"/bankAccount",
        component: BankAccount,
        content:"收款账号",
      },
      {
        path:"/my/orderList",
        component: OrderList,
        content:"我的订单",
      },
      {
        path:"/address",
        component: Address,
        content:"收货信息",
      },
      {
        path:"/shoppingCart",
        component: ShoppingCart,
        content:"购物车",
      },
      {
        path:"/mysell",
        component: Mysell,
        content:"我的出售",
      },
      {
        path:"/mysell",
        component: Mysell,
        content:"我的仓库",
      },
      {
        path:"/mybuy",
        component: Mybuy,
        content:"我的求购",
      },
      {
        path:"/commentList/sell",
        component: CommentList,
        content:"留言-出售",
      },
      {
        path:"/commentList/buy",
        component: CommentList,
        content:"留言-求购",
      },
      {
        path:"/commentList/news",
        component: CommentList,
        content:"留言-动态",
      }
]
const Router = ({routes,match}) => {
  return [
         <Route path={match.url} exact component={PersonSet}  />,
          routes.map((route,key) => (
            <Route path={match.url+route.path} component={route.component} />
          ))
        
      ]
}
export default class UserSet extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      collapsed: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const {match} = this.props;
    return (
      <Layout>
        <Sider
          className="white_bgColor"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="avatar algin_center text_hidden" >
            
              {
                this.state.collapsed ?  <Badge count={1}><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> </Badge>: "还念不能的首页"
              }
          </div>
          <SiderList menuData={data} />
        </Sider>
        <Layout>
          <Header className="nav_header_container white_bgColor">
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {/*<Breadcrumb style={{ lineHeight: '64px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>*/}
            <MyBreadcrumb  />
          </Header>
          <Content className="border_left_top" style={{ borderTop: '1px solid #e2e2e2', padding: 24, background: '#fff', minHeight: 280 }}>

            <Router routes={routes} match={match} />
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}