import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Items',
          route: '/user/items',
          permission: 'admin',
        },
        {
          icon: 'assets/icons/heroicons/outline/adjustment.svg',
          label: 'stock-adjustemnt',
          route: '/user/stock-adjustemnt',
          permission: 'admin',
        },
        {
          icon: 'assets/icons/heroicons/outline/scan.svg',
          label: 'manual-scan',
          route: '/user/manual-scan',
          permission: 'admin',
        },
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/user/settings',
          children: [
            { label: 'company', route: '/user/settings/company' },
            { label: 'category', route: '/user/settings/category' },
            {
              label: 'stores',
              route: 'settings/stores',
              children: [
                { label: 'main-store', route: '/user/settings/stores/main-store' },
                { label: 'sub-store', route: '/user/settings/stores/sub-store' },
                { label: 'island', route: '/user/settings/stores/island' },
              ],
            },
          ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/cube.svg',
        //   label: 'Job Categories',
        //   route: '/admin',
        //   children: [
        //     { label: 'Category', route: 'job/category' },
        //     { label: 'Position', route: 'job/position' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/cube.svg',
        //   label: 'Admin',
        //   route: '',
        //   children: [{ label: 'Table', route: '/components/table' }],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
        //   label: 'Errors',
        //   route: '/errors',
        //   children: [
        //     { label: '404', route: '/errors/404' },
        //     { label: '500', route: '/errors/500' },
        //   ],
        // },
      ],
    },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/folder.svg',
        //   label: 'Folders',
        //   route: '/folders',
        //   children: [
        //     { label: 'Current Files', route: '/folders/current-files' },
        //     { label: 'Downloads', route: '/folders/download' },
        //     { label: 'Trash', route: '/folders/trash' },
        //   ],
        // },
      ],
    },
  ];
}
