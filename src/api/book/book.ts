import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetBookList = '/book',
}

/**
 * @description: Get user menu based on id
 */

export const getBookList = (data) => {
  return defHttp.get({ url: Api.GetBookList,data });
};