import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Row wrap gutter="20">
        {this.props.data.map((item, index) => {
          return (
            <Col l="8" key={index}>
              <IceContainer style={styles.container}>
                <div style={styles.body}>
                  <h5 style={styles.name}>{item.name}</h5>
                  <p style={styles.description}>{item.description}</p>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  body: {
    padding: '20px',
    height: '120px',
    position: 'relative',
    borderBottom: '1px solid #f0f0f0',
  },
  name: {
    margin: '0',
    padding: '0',
    height: '28px',
    lineHeight: '28px',
    fontSize: '16px',
    color: '#0d1a26',
  },
  description: {
    fontSize: '14px',
    color: '#697b8c',
    margin: '12px 0',
  },
  tag: {
    background: 'rgb(244, 244, 244)',
    color: 'rgb(102, 102, 102)',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '4px 12px',
    textAlign: 'center',
    borderRadius: '50px',
    fontSize: '12px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    height: '56px',
    lineHeight: '56px',
    color: '#314659',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
  line: {
    borderRight: '1px solid #f0f0f0',
  },
  icon: {
    marginRight: '5px',
  },
};
