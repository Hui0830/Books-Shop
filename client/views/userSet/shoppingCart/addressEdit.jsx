  import React from 'react';
  import { Modal,Select,Form,Input,Icon,Tooltip,Cascader,Button  } from 'antd'

  const FormItem = Form.Item;
  const Option = Select.Option;
  const AddressEdit = ({form,visible,confirmLoading,address,handleSubmit,handleCancel,residences}) => {
    const { getFieldDecorator } = form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <div>
        <Modal title="编辑收货地址"
          visible={visible}
          footer={null}
          onCancel={handleCancel}
        >
          <p>{`${address}`}</p>
          <Form onSubmit={handleSubmit}>
            {/*---------------邮箱--------------------*/}
            <FormItem
              label="注册邮箱"
              hasFeedback
            >
              {
                getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email', message: '请输入正确的邮箱地址!',
                    }, 
                    {
                      required: true, message: '请输入你的邮箱!',
                    }
                  ],
                })(<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
              }
            </FormItem>
          {/*---------------昵称--------------------*/}
            <FormItem
              hasFeedback
              label={(
                <span>
                  昵称
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {
                getFieldDecorator('nickname', {
                    rules: [
                      { required: true, message: 'Please input your nickname!', whitespace: true }
                    ],
                })( <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
              }
            </FormItem>
          {/*---------------学校选择--------------------*/}
            <FormItem
              label="学校"
              hasFeedback
            >
              {
                getFieldDecorator('residence', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [
                      { type: 'array', required: true, message: 'Please select your habitual residence!' }
                    ],
                })(<Cascader options={residences} />)
              }
            </FormItem>
          {/*---------------手机号码--------------------*/}
            <FormItem
              label="手机号码"
              hasFeedback
            >
              {
                getFieldDecorator('phone', {
                    rules: [
                      { required: true, message: 'Please input your phone number!' }
                    ],
                })(
                  <Input 
                    addonBefore={prefixSelector} 
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    style={{ width: '100%' }} 
                  />
                )
              }
            </FormItem>

            <FormItem >
              <Button type="primary" htmlType="submit" style={{width:'100%'}} loading={confirmLoading} >确认</Button>
            </FormItem>

          </Form>
        </Modal>
      </div>
    )
  }
  export default AddressEdit