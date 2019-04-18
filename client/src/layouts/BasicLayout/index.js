import React, { Component } from 'react';
import axios from 'axios';
import Layout from '@icedesign/layout';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';
import './index.scss';
import host from '../../../public/config';

export default class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentWillMount() {
    const that = this;
    axios.get(`${host}/api/profile`).then((res) => {
      if (res.data.status === 302) {
        this.props.history.push('/user/login');
      } else if (res.data.status === 200) {
        that.setState({ name: res.data.data.name });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Layout
        fixable
        style={{ minHeight: '100vh' }}
        className="basic-layout-dark ice-design-layout"
      >
        <Header userName={this.state.name} />
        <Layout.Section>
          <Layout.Aside width={72}>
            <Aside />
          </Layout.Aside>

          <Layout.Main scrollable>
            <MainRoutes />
            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
