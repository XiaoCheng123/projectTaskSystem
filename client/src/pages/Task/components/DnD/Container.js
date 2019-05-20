import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';

function generateSource(component, dropback, index) {
  return (
    <SourceBox dropBack={dropback} index={index} key={index}>
      {component}
    </SourceBox>
  );
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderSource = () => {
    const data = this.props.data.filter((item) => {
      return item.status === 0;
    });
    return data.map((item, index) =>
      generateSource(item.name, this.sourceToTarget, index)
    );
  };

  renderTarget = () => {
    const data = this.props.data.filter((item) => {
      return item.status === 1;
    });
    return data.map((item, index, self) => {
      if (self.length) {
        return generateSource(item.name, null, index);
      }
      return generateSource(item.name, this.sourceToTarget, index);
    });
  };

  sourceToTarget = (index) => {
    const data = this.props.data.filter((item) => {
      return item.status === 0;
    });
    this.props.update(data[index]);
  };

  render() {
    return (
      <div style={styles.listContainer}>
        <div style={styles.list}>
          <div style={styles.listTitle}>未完成任务</div>
          <div style={{ minHeight: '15rem', padding: '15px', background: '#fff' }}>
            {this.renderSource()}
          </div>
        </div>
        <div style={styles.list}>
          <div style={styles.listTitle}>已完成任务</div>
          <TargetBox>{this.renderTarget()}</TargetBox>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);

const styles = {
  listContainer: {
    display: 'flex',
  },
  list: {
    margin: '0 7.5px',
    padding: '15px',
    background: '#f7f7f7',
    borderRadius: '4px',
    flex: 1,
  },
  listTitle: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
