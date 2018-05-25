import React,{Component} from 'react';
import { Table } from 'antd';
import axios from 'axios';
const columns = [
{
  title: '订单编号',
  dataIndex: 'email',
},
{
  title: '买家',
  dataIndex: 'email',
},
{
  title: '书籍信息',
  dataIndex: 'email',
},
{
  title: '下单时间',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
}, 
{
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
}, 
{
  title: '订单金额',
  dataIndex: 'email',
},
{
  title: '卖家确认金额',
  dataIndex: 'email',
},
{
  title: '送货方式',
  dataIndex: 'email',
},
{
  title: '订单状态',
  dataIndex: 'email',
}];

export default class SellOrderList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			pagination: {},
			loading: false,
		}
		this.handleTableChange = this.handleTableChange.bind(this)	
	}
	componentDidMount() {
	  this.fetch();
	}
  	handleTableChange(pagination, filters, sorter) {
	    const pager = {...this.state.pagination};
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetch({
	      results: pagination.pageSize,
	      page: pagination.current,
	      sortField: sorter.field,
	      sortOrder: sorter.order,
	      ...filters
	    });
  	}
  	fetch(params = {}){
	    console.log('params:', params);
	    this.setState({ loading: true });
	    axios.get('https://randomuser.me/api',
	    {
	      params: {
	      	results: 10,
	      	...params
	      }
	    }).then((res) => {
	      const pagination = this.state.pagination;
	      // Read total count from server
	      //pagination.total = res.data.totalCount;
	      pagination.total = 200;
	      this.setState({
	        loading: false,
	        data: res.data.results,
	        ...pagination
	      });
	    });
  	}
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={(pagination, filters, sorter) => this.handleTableChange(pagination, filters, sorter)}
      />
    );
  }
}
