import React,{Component} from 'react';
import { Table, Button, InputNumber,Popconfirm } from 'antd';
import { connect } from 'react-redux';

import { isArray } from '../../../until/until.js'

const mapStateToProps = (state,ownProps) => {
  const { carts } = state.userInfoData.userInfo;
  return {
    carts
  }
}
class Warehouse extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedRowKeys: [],
			selectedRows: [], // Check here to configure the default column
			loading: false,
			beforeTotalPrice: 0,
			afterTotalPrice: 0,
			buyNum: this.props.buyNum || 1,
			data: this.props.carts,
			totalPrice: this.props.totalPrice,
			columns: [
				{
				  title: '书名',
				  dataIndex: 'img',
				  render: (text,record) => {
				  	console.log(text,record)
				  	return (
				  		<img src={text} style={{width:'100px',heigth:'auto'}} />
				  	)
				  }
				}, 
				{
				  title: '卖家',
				  dataIndex: 'sellId',
				}, 
				{
				  title: '库存',
				  dataIndex: 'num',
				},
				{
				  title: '原价',
				  dataIndex: 'oldPrice',
				},
				{
				  title: '售价',
				  dataIndex: 'price',
				},
				{
				  title: '购买数量',
				  dataIndex: 'buyNum',
				  render: (text,record) => {
				  	return (
				  		<InputNumber min={1} max={10} defaultValue={this.state.buyNum} />
				  	)
				  }
				},
				{
				  title: '小计',
				  dataIndex: 'totalPrice',
				  render: (text,record) => 	`${this.state.afterTotalPrice*this.state.buyNum}`			    
				},
				{
				  title: '操作',
				  dataIndex: 'oprate',
				  render: (text,record) => {
				  	return (
				  		<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.id)}>
					        <Button>删除</Button>
					    </Popconfirm>
				  	)
				  }
				}
				]
		}

		this.startBuy = this.startBuy.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.addprice = this.addprice.bind(this)
	}

  	startBuy() {
	    this.setState({ loading: true });
	    const data = this.state.data
	    // ajax request after empty completing
	    console.log(this.state.selectedRows)
	    setTimeout(() => {
	      this.setState({
	        selectedRows: [],
	        loading: false,
	      });
	    }, 1000);
	}

	onSelectChange(selectedRowKeys,selectedRows) {
		console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
	    this.setState({ selectedRowKeys,selectedRows });
	    this.addprice(selectedRows)
	}

	onDelete(id) {
		const {data,selectedRows,selectedRowKeys} = this.state;
		this.addprice(selectedRows);
		this.setState({
			data: data.filter(item => item.id !== id),
			selectedRows: selectedRows.filter(item => item.id !== id),
			selectedRowKeys: selectedRowKeys.filter(item => item !== id)
		})
	}
	/*------计算价格-----*/
	addprice(data) {
		let  beforeTotalPrice = 0,afterTotalPrice = 0;
		if (isArray(data)) {
			data.forEach((item,index,arr) => {
				console.log(item.price);
				beforeTotalPrice  += item.oldPrice;
				afterTotalPrice += item.price;
			})	
		}
		this.setState({
			beforeTotalPrice,
			afterTotalPrice
		})
	}

  render() {
    const { loading, selectedRowKeys, selectedRows,beforeTotalPrice,afterTotalPrice } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table title={() => '我的订单'} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
        <div className="order_confirm algin_right padding_all common_bgColor">
          
          <span className="text_strong">
            {hasSelected ? selectedRows.length : '0'}
          </span>
          本书，原价：
          <del className="text_strong">
            {hasSelected ? `￥ ${beforeTotalPrice}` : '0'}
          </del>
          ，应付金额：
          <span className="text_strong">
            {hasSelected ? `￥ ${afterTotalPrice}` : '0'}
          </span>
          <Button
            type="primary"
            className="margin_left"
            onClick={this.startBuy}
            disabled={!hasSelected}
            loading={loading}
          >
            立即购买
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Warehouse)