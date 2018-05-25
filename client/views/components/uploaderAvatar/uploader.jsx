import { Upload, Icon, message,Modal } from 'antd';
import React,{ Component } from 'react';

require('./uploader.scss')

export default class UploadAvatar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      imageUrl:this.props.avatar,
      previewVisible:false

    }

    this.handleChange = this.handleChange.bind(this);
  }
  getBase64(img, callback) {
     const reader = new FileReader();
     reader.addEventListener('load', () => callback(reader.result));
     reader.readAsDataURL(img);
   }
  beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJPG && isLt2M;
    }
  handleChange(info){
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {loading,imageUrl} = this.state;
    return [
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={this.props.uploadUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {!loading ? <div className="up_img"><Icon type={'plus'} /><img src={imageUrl} title="头像" alt="头像" /></div>: uploadButton}
      </Upload>
    ];
  }
}