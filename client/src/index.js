import ReactDOM from 'react-dom';
import axios from 'axios';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import router from './router';

const ICE_CONTAINER = document.getElementById('ice-container');
axios.defaults.withCredentials = true;

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(router, ICE_CONTAINER);
