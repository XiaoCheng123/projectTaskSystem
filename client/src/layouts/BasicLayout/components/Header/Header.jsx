import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Balloon, Icon, Nav, Message } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import IceImg from '@icedesign/img';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './Header.scss';
import host from '../../../../../public/config';

@withRouter
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.loginOut = this.loginOut.bind(this);
  }

  loginOut() {
    axios.get(`${host}/api/logout`).then((res) => {
      if (res.data.status === 200) {
        Message.success('退出成功');
        this.props.history.push('/user/login');
      } else {
        Message.error('退出失败，请重试');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;

    return (
      <div className="header-container">
        <div className="header-content">
          <Logo isDark />
          <div className="header-navbar">
            <Nav
              className="header-navbar-menu"
              onClick={this.handleNavClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              direction="hoz"
            >
              {headerMenuConfig &&
                headerMenuConfig.length > 0 &&
                headerMenuConfig.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <Nav.SubNav
                        triggerType="click"
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span>{nav.name}</span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.external) {
                            if (item.newWindow) {
                              linkProps.target = '_blank';
                            }

                            linkProps.href = item.path;
                            return (
                              <Nav.Item key={item.path}>
                                <a {...linkProps}>
                                  <span>{item.name}</span>
                                </a>
                              </Nav.Item>
                            );
                          }
                          linkProps.to = item.path;
                          return (
                            <Nav.Item key={item.path}>
                              <Link {...linkProps}>
                                <span>{item.name}</span>
                              </Link>
                            </Nav.Item>
                          );
                        })}
                      </Nav.SubNav>
                    );
                  }
                  const linkProps = {};
                  if (nav.external) {
                    if (nav.newWindow) {
                      linkProps.target = '_blank';
                    }
                    linkProps.href = nav.path;
                    return (
                      <Nav.Item key={nav.path}>
                        <a {...linkProps}>
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            {nav.name}
                          </span>
                        </a>
                      </Nav.Item>
                    );
                  }
                  linkProps.to = nav.path;
                  return (
                    <Nav.Item key={nav.path}>
                      <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                        </span>
                      </Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
            <Balloon
              trigger={
                <div
                  className="ice-design-header-userpannel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 12,
                  }}
                >
                  <IceImg
                    height={40}
                    width={40}
                    src={require('./images/avatar.png')}
                    className="user-avatar"
                  />
                  <div className="user-profile">
                    <span className="user-name" style={{ fontSize: '13px' }}>
                      {this.props.userName}
                    </span>
                  </div>
                  <Icon
                    type="arrow-down"
                    size="xxs"
                    className="icon-down"
                  />
                </div>
              }
              closable={false}
              className="user-profile-menu"
            >
              <ul>
                <li className="user-profile-menu-item">
                  <Link to="/setting">
                    <FoundationSymbol type="repair" size="small" />
                    设置
                  </Link>
                </li>
                <li className="user-profile-menu-item">
                  <div onClick={this.loginOut}>
                    <FoundationSymbol type="compass" size="small" />
                    退出
                  </div>
                </li>
              </ul>
            </Balloon>
          </div>
        </div>
      </div>
    );
  }
}
