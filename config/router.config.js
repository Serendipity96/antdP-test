export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/dashboard2' },
      // dashboard2 大盘
      {
        path: '/dashboard/dashboard2',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Dashboard2',
      },
      // 详细
      {
        path: '/detail',
        name: 'detail',
        icon: 'profile',
        routes: [
          {
            path: '/detail/statistics',
            name: 'statistics',
            component: './Detail/Statistics',
          },
          {
            path: '/detail/chart',
            name: 'chart',
            component: './Detail/Chart',
          },
          {
            path: '/detail/alarmRecord',
            name: 'alarmRecord',
            component: './Detail/AlarmRecord',
          },
        ],
      },

      // 设置
      {
        path: '/set',
        name: 'set',
        icon: 'table',
        component: './Set/Set',
      },
      {
        component: '404',
      },
    ],
  },
];
