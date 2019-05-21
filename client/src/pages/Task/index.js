import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, Button, Dialog, Form, Input, Message } from '@alifd/next';
import axios from 'axios';
import host from '../../../public/config';
import DnD from './components/DnD';

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
};

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { fixedSpan: 5 },
  wrapperCol: { span: 20 },
};

export default class Task extends Component {
  static displayName = 'FilterBar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
      projectValue: -1,
      visible: false,
      data: [],
      isOwner: true,
    };
  }

  componentWillMount = () => {
    this.getProject();
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

  onChange = (value) => {
    console.log(value);
    this.setState({
      projectValue: value,
    });
    this.getTaskByProjectId(value);
  };

  getTaskByProjectId = (value) => {
    axios.get(`${host}/api/getTask?id=${value}`).then((res) => {
      if (res.data.status !== 200) {
        this.setState({
          data: res.data.data,
          isOwner: true,
        });
      } else {
        this.setState({
          data: res.data.data,
          isOwner: false,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  handleSubmit = (values, errors) => {
    values.projectValue = this.state.projectValue;
    axios.post(`${host}/api/addTask`, values).then((res) => {
      if (res.data.status === 200) {
        Message.success('添加成功');
        this.getTaskByProjectId(this.state.projectValue);
      } else if (res.data.status === 400) {
        Message.error('请选择项目');
      } else if (res.data.status === 401) {
        Message.error('请填写题目');
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

  updateTask = (item) => {
    console.log(item);
    axios.get(`${host}/api/updateTask?id=${item.id}`).then((res) => {
      this.getTaskByProjectId(this.state.projectValue);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="task-page">
        {/* 适用于页面顶部的筛选场景 */}
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
          <Button disabled={this.state.isOwner} style={{ margin: '10px 10px 10px 10px' }} onClick={this.onOpen} type="primary">
          添加任务
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
              <FormItem label="任务名称:">
                <Input name="name" placeholder="请输入任务名称" />
              </FormItem>
              <FormItem label="任务描述:">
                <Input.TextArea name="description" placeholder="请输入任务描述" />
              </FormItem>
            </Dialog>
          </Form>
        </IceContainer>
        {/* 元素拖拽放置 */}
        <DnD data={this.state.data} update={this.updateTask} />
      </div>
    );
  }
}
