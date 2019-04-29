// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '项目',
    path: '/services',
    icon: 'cascades',
  },
  {
    name: '消息提醒',
    path: '/activities',
    icon: 'activity',
  },
  {
    name: '成员',
    path: '/member',
    icon: 'person',
  },
  {
    name: '任务',
    path: '/task',
    icon: 'task',
  },
  {
    name: '设置',
    path: '/setting',
    icon: 'shezhi',
  },
];

export { headerMenuConfig, asideMenuConfig };
