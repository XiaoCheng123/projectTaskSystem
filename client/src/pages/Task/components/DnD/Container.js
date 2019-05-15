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
      listSource: [
        '努力写论文',
        '认真锻炼',
        '成功毕业',
        '成为CEO',
      ],
      listTarget: [
        '答辩通过',
      ],
    };
  }

  renderSource = () => {
    return this.state.listSource.map((item, index) =>
      generateSource(item, this.sourceToTarget, index)
    );
  };

  renderTarget = () => {
    return this.state.listTarget.map((item, index, self) => {
      if (self.length) {
        return generateSource(item, null, index);
      }
      return generateSource(item, this.sourceToTarget, index);
    });
  };

  sourceToTarget = (index) => {
    this.setState((prevState) => {
      return {
        listTarget: [...prevState.listTarget, prevState.listSource[index]],
        listSource: [].concat(
          prevState.listSource.splice(0, index),
          prevState.listSource.splice(index)
        ),
      };
    });
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
