import { asyncRoutes } from '@/router/routes';

const newRoutes: Record<string, any> = {};

function generateRouteMap(routes) {
  routes.forEach((item) => {
    if (item.name && item.component) {
      newRoutes[String(item.name)] = item.component;
    }

    if (item.children?.length) {
      generateRouteMap(item.children);
    }
  });
}

generateRouteMap(asyncRoutes);

export const ROUTE_MAP = newRoutes;
