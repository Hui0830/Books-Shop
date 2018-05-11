import { List, message, Avatar, Spin,Icon,Button } from 'antd';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

// import ToTop from '../toTop/toTop';
import  { get } from '../../../until/http';

require('./infiniteScroller.scss');


const fakeDataUrl = 'http://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

/*-------item底部Icon组件---------*/
const IconText = ({ type, text }) => (
  <span className = {type === "pay-circle-o" ? "pirce" : ''}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
/*-----------渲染Item组件--------------*/
const RenderItem = ({item}) => {
  return (
    <List.Item
        key={item.title}
        id={item.id === 1 ? `item${item.id}` : null}
        actions={
          [
            <IconText type="star-o" text="156" />, 
            <IconText type="like-o" text="156" />, 
            <IconText type="message" text="2" />,
            <IconText type="pay-circle-o" text="100.00" />,
            <IconText type="pay-circle" text={<del>200.0</del>} />
          ]
        }
        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
  )
  
}

export default class InfiniteListExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      lenght: 0,
    }

    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
  }
  componentDidMount() {
    const data = this.getArray(6)
      this.setState({
        data: data,
      });
  }
  getArray(num) {
    let listData = [];
    for (let i = 0; i < num; i++) {
      listData.push({
        id: i,
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
     
    }
     return listData
  }
  /*getData(callback) {
    axios.get(fakeDataUrl).then((res) => {
      callback(res.data)
    })
  }*/
  handleInfiniteOnLoad() {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 24) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    setTimeout(() => {
      let data1 = this.getArray(6);
      data = data1.concat(data);
      this.setState({
        data,
        loading: false,
      });
    },2000)
    /*this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });*/
  }
  render() {
    let listData =this.state.data;
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            key="goodBooks"
              itemLayout="vertical"
              size="large"
              dataSource={listData}
              footer={null}
              renderItem={(item) => (
                <RenderItem item={item} />
              )}
            >
            {/*this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )*/}
            {this.state.hasMore ? 
              <div className="get_more">
                { 
                  this.state.loading ? 
                    (<Button><Icon type="loading" />加载中....</Button>) : 
                    (<Button><Icon type="sync" />滚动加载更多....</Button>)
                }

              </div> : 
              <div className="get_more">
                  <Button onClick={() => message.warning=("没有更多数据啦....")}><Icon type="sync" />没有更多数据啦....</Button>
              </div>

            }
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}
