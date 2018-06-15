/*import { List, message, Avatar, Spin,Icon,Button } from 'antd';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

// import ToTop from '../toTop/toTop';
import  { get } from '../../../until/http';

require('./infiniteScroller.scss');


const fakeDataUrl = 'http://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';



export default class InfiniteListExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasMore: true,
      length: this.props.listData.length,
    }

    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this)
  }

  handleInfiniteOnLoad() {
    const data = this.props.listData;
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
      let num = this.state.length;
      console.log(num);
      this.props.getArray(num,num+6);
      this.setState({
        loading: false,
      });
    },2000)
  }
  getChildren() {
    return React.Children.map(this.props.children,(child) => {
      if(!child) return;
      const {listData} = this.props;
      return React.cloneElement(child, {
        listData
      })
    })
  }
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          { this.getChildren() }
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
        </InfiniteScroll>
      </div>
    );
  }
}
*/