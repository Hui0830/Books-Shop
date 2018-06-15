import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
const mapStateToProps = (state,ownProps) => {
  const { sellerOrder } = state.userInfoData.userInfo;
  return {
    sellerOrder
  }
}

const columns = [
{
  title: '订单编号',
  dataIndex: 'OrderId',
},
{
  title: '买家',
  dataIndex: 'name',
},
{
  title: '书籍信息',
  dataIndex: 'name',
}, 
{
  title: '订单金额',
  dataIndex: 'oldPrice',
},
{
  title: '卖家确认金额',
  dataIndex: 'price',
},
{
  title: '购买数量',
  dataIndex: 'buyNum',
},
{
  title: '下单时间',
  dataIndex: 'createTime',
  sorter: true,
  render: name => name,
}, 
{
  title: '订单状态',
  dataIndex: 'status',
  filters: [
    { text: '未付款', value: '未付款' },
    { text: '已完成', value: '已完成' },
  ],
}];

class SellOrderList extends Component {
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
	    setTimeout(() => {
	    	const pagination = this.state.pagination;
	    	pagination.total = 200;
	    	this.setState({
	    	  loading: false,
	    	  data: this.props.sellerOrder,
	    	  ...pagination
	    	});	
	    },1000)
	      
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
export default connect(mapStateToProps)(SellOrderList)