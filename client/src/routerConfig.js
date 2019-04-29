// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';

import Services from './pages/Services';
import Member from './pages/Member';
import Setting from './pages/Setting';

import AddMember from './pages/AddMember';
import Task from './pages/Task';
import Activities from './pages/Activities';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/services',
    component: Services,
  },
  {
    path: '/activities',
    component: Activities,
  },
  {
    path: '/member',
    component: Member,
  },
  {
    path: '/add/member',
    component: AddMember,
  },
  {
    path: '/setting',
    component: Setting,
  },
  {
    path: '/task',
    component: Task,
  },
];

export default routerConfig;
