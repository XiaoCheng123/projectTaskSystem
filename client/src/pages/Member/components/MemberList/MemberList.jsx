/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Select, Button, Form, Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import host from '../../../../../public/config';

const FormItem = Form.Item;

let firstData = [];

const formItemLayout = {
  labelCol: { fixedSpan: 5 },
  wrapperCol: { span: 20 },
};

@withRouter
export default class MemberList extends Component {
  state = {
    data: [],
    projectData: [],
    dataSource: [],
    projectValue: -1,
  };

  componentWillMount = () => {
    this.getProject();
    this.getUser();
  }

  getProject = () => {
    axios.get(`${host}/api/projectInfo`).then((res) => {
      this.setState({
        projectData: res.data.data,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  getUser = () => {
    axios.get(`${host}/api/getUser`).then((res) => {
      firstData = res.data.data;
      const dataSource = res.data.data.map(item => ({
        label: item.name, value: item.id,
      }));
      this.setState({ dataSource });
    }).catch((err) => {
      console.log(err);
    });
  }

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
    this.getUser();
  };

  handleSubmit = (values, errors) => {
    values.projectValue = this.state.projectValue;
    axios.post(`${host}/api/addPerson`, values).then((res) => {
      if (res.data.status === 200) {
        Message.success('添加成功');
        this.getUserByProjectId(this.state.projectValue);
      } else if (res.data.status === 400) {
        Message.error('请选择项目');
      } else if (res.data.status === 401) {
        Message.error('请选择人员');
      } else {
        Message.error('添加失败');
      }
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.setState({
        visible: false,
      });
    });

    if (errors) {
      return;
    }
    console.log('Get form value:', values);
  };

  handleSearch = (value) => {
    const dataSource = firstData.filter((item) => {
      return item.name.includes(value);
    }).map(item => ({
      // eslint-disable-next-line no-plusplus
      label: item.name, value: item.id,
    }));

    this.setState({
      dataSource,
    });
  }

  handleDelete = (index) => {
    const value = {
      projectId: this.state.projectValue,
      user: this.state.data[index - 1],
    };

    console.log(value);
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        axios.post(`${host}/api/deleteMerber`, value).then((res) => {
          if (res.status === 200) {
            Message.success('删除成功');
            this.getUserByProjectId(this.state.projectValue);
          } else {
            Message.error('删除失败');
          }
        }).catch((err) => {
          console.log(err);
        });
      },
    });
  };

  onChange = (value) => {
    console.log(value);
    this.setState({
      projectValue: value,
    });
    this.getUserByProjectId(value);
  };

  getUserByProjectId = (value) => {
    axios.get(`${host}/api/getMerber?id=${value}`).then((res) => {
      this.setState({
        data: res.data.data,
      });
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  renderProfile = (value, index, record) => {
    return (
      <div style={styles.profile}>
        <img src={record.avatar} alt="" style={styles.avatar} />
        <span style={styles.name}>{record.name}</span>
      </div>
    );
  };

  renderOper = (value) => {
    return (
      <div>
        <a
          onClick={() => this.handleDelete(value)}
          style={{ ...styles.link, ...styles.delete }}
        >
          删除
        </a>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <IceContainer style={styles.container}>
        <Select
          size="large"
          onChange={this.onChange}
          style={{ marginLeft: '70%' }}
          defaultValue="-1"
        >
          <Select.Option value="-1">请选择项目</Select.Option>
          {this.state.projectData.map((index) => {
              return (
                <Select.Option value={index.id}>{index.name}</Select.Option>
              );
          }
          )}
        </Select>
        <Button style={{ margin: '10px 10px 10px 10px' }} onClick={this.onOpen} type="primary">
          添加人员
        </Button>
        <Form style={{ width: '100%' }} {...formItemLayout} >
          <Dialog
            title="新建人员"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            footer={<FormItem label=" "><Form.Submit onClick={this.handleSubmit}>提交</Form.Submit></FormItem>}
            onCancel={this.onClose}
            onClose={this.onClose}
          >
            <FormItem label="人员名称:">
              <Select name="selectUser" showSearch placeholder="输入人员名字" filterLocal={false} dataSource={this.state.dataSource} onSearch={this.handleSearch} style={{ width: 200 }} />
            </FormItem>
          </Dialog>
        </Form>
        <Table dataSource={data} hasHeader={false} hasBorder={false}>
          <Table.Column dataIndex="name" cell={this.renderProfile} />
          <Table.Column dataIndex="email" />
          <Table.Column dataIndex="id" cell={this.renderOper} />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    borderBottom: '0',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '24px',
    height: '24px',
    border: '1px solid #eee',
    background: '#eee',
    borderRadius: '50px',
  },
  name: {
    marginLeft: '15px',
    color: '#314659',
    fontSize: '14px',
  },
  link: {
    cursor: 'pointer',
    color: '#1890ff',
  },
  edit: {
    marginRight: '5px',
  },
};
