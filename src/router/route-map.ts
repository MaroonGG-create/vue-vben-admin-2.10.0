
import {
  EXCEPTION_COMPONENT,
  LAYOUT
} from '/@/router/constant';
export const ROUTE_MAP = {
    Dashboard: LAYOUT,
    Analysis: () => import('/@/views/dashboard/analysis/index.vue'),
    Workbench: () => import('/@/views/dashboard/workbench/index.vue'),
    NOT_FOUND:EXCEPTION_COMPONENT
}