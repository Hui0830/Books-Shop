import React from 'react';
import { Layout, Menu, Row, Col,Icon, Spin, Anchor } from 'antd';

import AppBar from './app-navBar';
import ToTop from '../components/toTop/toTop';
require('./layout.pcss');
const logo = require('../../public/images/logo.png');




const { Header, Content, Footer } = Layout;
const city = [
  "北京","上海","黑龙江","吉林","辽宁",
  "天津",
  "安徽",
  "江苏",
  "浙江",
  "陕西",
  "湖北",
  "广东",
  "湖南",
  "甘肃",
  "四川",
  "山东",
  "福建",
  "河南",
  "重庆",
  "云南",
  "河北",
  "江西",
  "山西",
  "贵州",
  "广西",
 "内蒙古",
  "宁夏",
  "青海",
  "新疆",
  "海南",
  "西藏",
  "香港",
  "澳门",
  "台湾"
]
const schoolData = [
  {
    id: 0, 
    city: '江西',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },
  {
    id: 1, 
    city: '北京',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },
  {
    id: 2, 
    city: '广东',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },
  {
    id: 3, 
    city: '上海',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },
  {
    id: 4, 
    city: '南京',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },
  {
    id: 5, 
    city: '江苏',
    content: [
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学',
      '江西农业大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学','江西财经大学'
    ]
  },

]

const AppLayout = ({children}) => {
  return (

    <Layout>
      <AppBar schoolData = {schoolData} city={city} />
      <Header id="top" style={{ width: '100%',height:'66px',background: '#fff',fontSize: '3em' }}>
        <Row type="flex" justify="space-around">
          <Col xs={6} className="logo">
            <img src = { logo } />
          </Col>
          <Col xs={14}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px',float: 'right' }}
            >
              <Menu.Item key="1">
                <Icon type="home" />
                  首页
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="shopping-cart" />
                  出售
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="shop" />
                  求购
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px'}}>
        <div style={{ background: '#fff',minHeight: 380 }}>
          { children }
        </div>
        <ToTop toId="#item1" />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  )
}
export default AppLayout;