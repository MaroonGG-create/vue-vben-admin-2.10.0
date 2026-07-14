import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/getMenuList',
  GetActiveMenu = '/menu/active',
  createMenu = '/menu/create',
  updateMenu = '/menu/update',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getActiveMenu = () => {
  return defHttp.get({ url: Api.GetActiveMenu });
};
export const createMenu = (params) => {
  return defHttp.post({ url: Api.createMenu, params });
};
export const updateMenu = (params) => {
  return defHttp.put({ url: Api.updateMenu, params });
};
