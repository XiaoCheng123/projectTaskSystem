import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Select, Button } from '@alifd/next';

export default class FilterBar extends Component {
  static displayName = 'FilterBar';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Select 发生改变的时候触发的回调
   */
  handleSelectChange = (value) => {
    console.log('handleSelectChange:', value);
  };

  /**
   * DatePicker 发生改变的时候触发的回调
   */
  handleDatePickerChange = (value) => {
    console.log('handleDatePickerChange:', value);
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <Select
          size="large"
          style={{ width: '200px' }}
          onChange={this.handleSelectChange}
          defaultValue="taobao"
        >
          <Select.Option value="taobao">项目名称</Select.Option>
          <Select.Option value="aliyun">项目名称</Select.Option>
          <Select.Option value="dingding">项目名称</Select.Option>
        </Select>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={this.handleClick}
        >
          新建任务
        </Button>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
