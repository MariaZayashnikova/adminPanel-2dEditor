import {
  DashboardOutlined,
  PlusCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

// const dashBoardNavTree = [{
//   key: 'home',
//   path: `${APP_PREFIX_PATH}/home`,
//   title: 'home',
//   icon: DashboardOutlined,
//   breadcrumb: false,
//   submenu: []
// }]

const extraNavTree = [
  {
    key: 'extra',
    path: `${APP_PREFIX_PATH}/pages`,
    title: 'sidenav.pages',
    icon: PlusCircleOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'extra-pages',
        path: `${APP_PREFIX_PATH}/pages`,
        title: 'sidenav.pages',
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'extra-pages-list',
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: 'sidenav.pages.userlist',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-pages-editor',
            path: `${APP_PREFIX_PATH}/pages/editor`,
            title: 'sidenav.pages.editor',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      }
    ]
  }
]

const navigationConfig = [
  ...extraNavTree
]

export default navigationConfig;
