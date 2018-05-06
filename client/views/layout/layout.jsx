import React from 'react';
import { Layout, Menu, Row, Col,Icon} from 'antd';

require('./layout.pcss');
const logo = require('../../public/images/logo.png');




const { Header, Content, Footer } = Layout;
const style = {

}

const AppLayout = ({children}) => {
  return (

    <Layout>
      <Row justify="end" style={{ height: '30px',lineHeight: '30px', width: '100%',background: 'rgb(51,51,51)' }}>
        <Col pull={1} xs={23}>
          <div className="top_user_info">
            
            <a href="/site/login">
              <Icon type="user"/>
              登录
            </a>
            |
            <a style={{color:"rgb(1,200,181)"}} href="/regist">
              <Icon type="user-add" />立即注册
            </a>               
          </div>
        </Col>
      </Row>
      <Header style={{ width: '100%',height:'66px',background: '#fff',fontSize: '3em' }}>
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
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  )
}
export default AppLayout;