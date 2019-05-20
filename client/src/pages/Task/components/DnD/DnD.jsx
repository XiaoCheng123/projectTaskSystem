import React, { Component } from 'react';
import Container from './Container';
import IceContainer from '@icedesign/container';

export default class CustomizeDropEffects extends Component {
  render() {
    return (
      <IceContainer>
        <Container data={this.props.data} update={this.props.update} />
      </IceContainer>
    );
  }
}
