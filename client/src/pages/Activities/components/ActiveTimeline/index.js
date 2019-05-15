import React, { Component } from 'react';
import { Timeline } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import './index.scss';

const { Item: TimelineItem } = Timeline;

export default class ActiveTimeline extends Component {
  render() {
    return (
      <div>
        <ContainerTitle title="消息列表" />
        <IceContainer>
          <Timeline className="project-timeline">
            <TimelineItem
              title="项目名称"
              content="项目名称创建成功"
              time="2019-05-10 10:38:03"
            />
            <TimelineItem
              title="项目名称"
              content="项目名称创建成功"
              time="2019-05-10 10:37:33"
            />
            <TimelineItem
              title="项目名称"
              content="项目名称创建成功"
              time="2019-05-10 10:35:08"
            />
          </Timeline>
        </IceContainer>
      </div>
    );
  }
}
