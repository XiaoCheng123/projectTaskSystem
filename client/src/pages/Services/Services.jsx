import React, { Component } from 'react';
import axios from 'axios';
import ServiceCard from './components/ServiceCard';
import ServiceHead from './components/ServiceHead';
import host from '../../../public/config';

export default class Services extends Component {
  static displayName = 'Services';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
    };
  }

  componentWillMount = () => {
    this.getData();
  }

  update = () => {
    console.log('update');
    this.getData();
  }

  getData = () => {
    console.log('get');
    axios.get(`${host}/api/projectInfo`).then((res) => {
      this.setState({
        projectData: res.data.data ? res.data.data : [],
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <div>
        <ServiceHead update={this.update} />
        <ServiceCard data={this.state.projectData} />
      </div>
    );
  }
}
