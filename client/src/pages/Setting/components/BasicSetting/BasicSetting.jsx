/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';
import host from '../../../../../public/config';
import ContainerTitle from '../../../../components/ContainerTitle';

export default class BasicSetting extends Component {
  static displayName = 'BasicSetting';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        id: -1,
        userName: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        againPassword: '',
      },
    };
  }

  componentWillMount() {
    axios.get(`${host}/api/profile`).then((res) => {
      if (res.data.status === 200) {
        const value = {
          id: res.data.data.id,
          userName: res.data.data.name,
          email: res.data.data.email,
          oldPassword: '',
          newPassword: '',
          againPassword: '',
        };
        this.setState({
          value,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  formChange = (value) => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      values.id = this.state.value.id;
      axios.post(`${host}/api/updateUser`, values).then((res) => {
        if (res.status === 200) {
          Message.success('修改成功');
        } else if (res.status === 203) {
          axios.get(`${host}/api/logout`).then((res2) => {
            if (res2.data.status === 200) {
              Message.success('退出成功');
              this.props.history.push('/user/login');
            }
          }).catch((err) => {
            console.log(err);
          });
        } else {
          Message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  };

  checkPasswd = (rule, values, callback, stateValues) => {
    if (stateValues.oldPassword === '') {
      callback('请先输入旧密码');
    }

    if (!values) {
      callback();
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback();
    } else if (values && values !== stateValues.newPassword) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  render() {
    return (
      <div>
        <ContainerTitle title="基本设置" />
        <IceContainer style={styles.container}>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>用户名</div>
                <IceFormBinder name="userName">
                  <Input
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>邮箱</div>
                <IceFormBinder
                  name="email"
                >
                  <Input
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>旧密码</div>
                <IceFormBinder name="oldPassword">
                  <Input
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>新密码</div>
                <IceFormBinder
                  name="newPassword"
                  validator={this.checkPasswd}
                >
                  <Input
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
                <IceFormError name="newPassword" />
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>再次输入新密码</div>
                <IceFormBinder
                  name="againPassword"
                  validator={(rule, values, callback) =>
                    this.checkPasswd2(rule, values, callback, this.state.value)
                  }
                >
                  <Input
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
                <IceFormError name="againPassword" />
              </div>
              <Button
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  title: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0,.85)',
  },
  summary: {
    margin: '0 0 20px',
  },
  formItem: {
    marginBottom: '20px',
  },
  formLabel: {
    marginBottom: '10px',
  },
  formError: {
    marginTop: '10px',
  },
};
