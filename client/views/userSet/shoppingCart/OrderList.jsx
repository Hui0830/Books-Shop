import React,{Component} from 'react';
import { Table, Button, InputNumber,Popconfirm } from 'antd';
import store from '../../../store/Store'

const data = store.getState().userCart;
/*for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    bookName: `深入react 技术栈 ${i}`,
    sellName: `怀念不能${i}`,
    bookNum: `${i}`,
    beforePrice: `￥ ${i}`,
    afterPrice: `￥ ${i}`,
    buyNum: <InputNumber min={1} max={10} defaultValue={1} />,
    totalPrice: `￥ ${i}`,
    oprate:'删除'
  });
};
*/
export default class OrderList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedRowKeys: [],
			selectedRows: [], // Check here to configure the default column
			loading: false,
			data: data,
			columns: [
				{
				  title: '书名',
				  dataIndex: 'bookName',
				}, 
				{
				  title: '卖家',
				  dataIndex: 'sellName',
				}, 
				{
				  title: '库存',
				  dataIndex: 'bookNum',
				},
				{
				  title: '原价',
				  dataIndex: 'beforePrice',
				},
				{
				  title: '售价',
				  dataIndex: 'afterPrice',
				},
				{
				  title: '购买数量',
				  dataIndex: 'buyNum',
				  render: (text,record) => {
				  	return (
				  		<InputNumber min={1} max={10} defaultValue={1} />
				  	)
				  }
				},
				{
				  title: '小计',
				  dataIndex: 'totalPrice',
				    
				},
				{
				  title: '操作',
				  dataIndex: 'oprate',
				  render: (text,record) => {
				  	return (
				  		<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
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
	}
	componentWillMount() {
		console.log(this.state.data)
	}
  	startBuy() {
	    this.setState({ loading: true });
	    const data = this.state.data
	    // ajax request after empty completing
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
	}

	onDelete(key) {
		const data = this.state.data
		this.setState({
			data: data.filter(item => item.key !== key)
		})
	}

  render() {
    const { loading, selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table title={() => '我的订单'} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
        <div style={{ marginBottom: 16 }}>
          
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `共 ${selectedRows.length} items` : ''}
          </span>
          <Button
            type="primary"
            onClick={this.startBuy}
            disabled={!hasSelected}
            loading={loading}
          >
            删除选中
          </Button>
        </div>
      </div>
    );
  }
}