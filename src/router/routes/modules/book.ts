import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const book: AppRouteModule = {
  path: '/book',
  name: 'Book',
  component: LAYOUT,
  redirect: '/book/list',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.book.manage'),
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('/@/views/demo/page/list/search/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.book.list'),
      },
    },
    {
      path: 'create',
      name: 'Create',
      component: () => import('/@/views/demo/page/form/high/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.book.create'),
      },
    },
  ],
};

export default book;
