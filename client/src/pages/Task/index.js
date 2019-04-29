import React, { Component } from 'react';
import FilterBar from './components/FilterBar';
import DnD from './components/DnD';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="task-page">
        {/* 适用于页面顶部的筛选场景 */}
        <FilterBar />
        {/* 元素拖拽放置 */}
        <DnD />
      </div>
    );
  }
}
