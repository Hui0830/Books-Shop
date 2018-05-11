import React from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	Button,
	Icon,
	Tag,
	List
} from 'antd'
import MyModal from '../my-Modal/myModal'

const SelectSchool = ({city,school,visible, loading, showModal,handleCancel,selectAll,selectCity,selectSchool}) => {
	return(
	<div>
        <Button style={{border: 'none'}} type="primary" ghost icon="environment-o" onClick={showModal}>
        	[ 选择学校 ]
        </Button>
        <Modal
          className="SelectSchool"
          visible={visible}
          onCancel={handleCancel}
          width="600px"
          title="请选择学校："
          footer=""
        >
          
   		<div className="selectAll">
   			快捷选择：<Tag onClick={selectAll} color="cyan">所有学校</Tag>
   		</div>
		<List
		   className="city-container"
		   grid={{ gutter: 16, column: 8}}
		   dataSource={city}
		   renderItem={item => (
		     <List.Item>
		      	<Tag onClick={selectCity} title={item} color="cyan">{item}</Tag>
		     </List.Item>
		   )}
		 />
		 <List
		 	className="school-container"
		    grid={{ gutter: 16, column: 4}}
		    dataSource={school.content}
		    renderItem={item => (
    			<List.Item>
    			 	<Tag onClick={selectSchool} title={item} color="cyan">{item}</Tag>
    			</List.Item>
		    )}
		  />
        </Modal>
        <MyModal loading = {loading} />
      </div>
	)
}
SelectSchool.propTypes = {
	school:PropTypes.object,
	showModal: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	visible: PropTypes.bool.isRequired

}
export default SelectSchool