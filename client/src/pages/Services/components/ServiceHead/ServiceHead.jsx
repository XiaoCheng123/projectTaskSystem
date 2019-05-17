import React, { Component } from 'react';
import { Button, Dialog, Form, Input, Message } from '@alifd/next';
import axios from 'axios';
import host from '../../../../../public/config';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { fixedSpan: 5 },
  wrapperCol: { span: 20 },
};

export default class ServiceHead extends Component {
  state = {
    visible: false,
  };

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = (reason) => {
    console.log(reason);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (values, errors) => {
    this.setState({
      visible: false,
    });
    if (errors) {
      return;
    }
    axios.post(`${host}/api/addProject`, values).then((res) => {
      if (res.data.status === 200) {
        Message.success('新建成功');
      } else {
        this.props.updateParent();
        Message.success('新建失败');
      }
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
    console.log('Get form value:', values);
  };

  render() {
    return (
      <div style={styles.head}>
        <Button onClick={this.onOpen} type="primary">
          新建项目
        </Button>
        <Form style={{ width: '100%' }} {...formItemLayout} >
          <Dialog
            title="新建项目"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            footer={<FormItem label=" "><Form.Submit onClick={this.handleSubmit}>提交</Form.Submit></FormItem>}
            onCancel={this.onClose}
            onClose={this.onClose}
            style={{ width: '60%' }}
          >
            <FormItem label="项目名称:">
              <Input name="name" placeholder="请输入项目名称" />
            </FormItem>
            <FormItem label="项目描述:">
              <Input.TextArea name="description" placeholder="请输入项目描述" />
            </FormItem>
          </Dialog>
        </Form>
      </div>
    );
  }
}

const styles = {
  head: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
