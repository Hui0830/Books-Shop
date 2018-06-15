import React from 'react';
import { Layout, Menu, Row, Col,Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import AppBar from './app-navBar';
import ToTop from '../components/toTop/toTop';
require('./layout.scss');
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
              id="top"
              mode="horizontal"
              style={{ lineHeight: '64px',float: 'right' }}
            >
              <Menu.Item key="1">
                <NavLink to='/index'>
                  <Icon type="home" />
                    首页
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to='/product'>
                  <Icon type="shopping-cart" />
                    出售
                </NavLink>
              </Menu.Item>

              <Menu.Item key="3">
                <Icon type="shop" />
                  求购
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content className="margin_top padding_right_left  layout_content">
        <div className="white_bgColor">
          { children }
        </div>
        <ToTop toId="#top" />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        校园旧书街 ©2018-6-1 Created by 江西农业大学-计算机科学与技术
      </Footer>
    </Layout>
  )
}
export default AppLayout;