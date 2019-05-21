import React, { Component } from 'react';
import { Timeline } from '@alifd/next';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import ContainerTitle from '../../../../components/ContainerTitle';
import host from '../../../../../public/config';
import './index.scss';

const { Item: TimelineItem } = Timeline;

export default class ActiveTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount = () => {
    this.getNotice();
  }

  getNotice = () => {
    axios.get(`${host}/api/getNotice`).then((res) => {
      this.setState({
        data: res.data.data,
      });
    });
  }

  render() {
    return (
      <div>
        <ContainerTitle title="消息列表" />
        <IceContainer>
          <Timeline className="project-timeline">
            {
            this.state.data.map((item) => {
              return (
                <TimelineItem
                  title={item.name}
                  content={item.description}
                  time={item.time}
                />
              );
            })
          }
          </Timeline>
        </IceContainer>
      </div>
    );
  }
}
