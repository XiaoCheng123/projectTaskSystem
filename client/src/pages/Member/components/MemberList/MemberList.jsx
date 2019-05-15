import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Select } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '../../../../components/ContainerTitle';

const mockData = [
  {
    id: 1,
    avatar:
      'https://img.alicdn.com/tfs/TB18g0ydNTpK1RjSZR0XXbEwXXa-500-500.jpg',
    name: '123',
    email: '1197138309@qq.com',
  },
  {
    id: 2,
    avatar:
      'https://img.alicdn.com/tfs/TB18g0ydNTpK1RjSZR0XXbEwXXa-500-500.jpg',
    name: '小成1',
    email: '1197138309@qq.com',
  },
  {
    id: 3,
    avatar:
      'https://img.alicdn.com/tfs/TB18g0ydNTpK1RjSZR0XXbEwXXa-500-500.jpg',
    name: '小成2',
    email: '1197138309@qq.com',
  },
];

@withRouter
export default class MemberList extends Component {
  state = {
    data: mockData,
  };

  handleAdd = () => {
    this.props.history.push('/add/member');
  };

  handleDelete = (index) => {
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        const { data } = this.state;

        data.splice(index, index + 1);
        this.setState({
          data,
        });
      },
    });
  };

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
        <Link to="/add/member" style={{ ...styles.link, ...styles.edit }}>
          修改
        </Link>
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
          style={{ position: 'absolute', top: '93px', right: '140px' }}
          defaultValue="taobao"
        >
          <Select.Option value="taobao">项目名称</Select.Option>
          <Select.Option value="aliyun">项目名称</Select.Option>
          <Select.Option value="dingding">项目名称</Select.Option>
        </Select>
        <ContainerTitle
          title="项目成员"
          buttonText="添加成员"
          style={styles.title}
          onClick={this.handleAdd}
        />
        <Table dataSource={data} hasHeader={false} hasBorder={false}>
          <Table.Column dataIndex="name" cell={this.renderProfile} />
          <Table.Column dataIndex="email" />
          <Table.Column dataIndex="role" />
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
