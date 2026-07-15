import { FormSchema } from '/@/components/Form/index';
import { getBookList } from '@/api/book/book';
export const searchList = (async () => {
  const result: any[] = [];
  let res = await getBookList({});
  console.log(res);
  for (let i = 0; i < res.length; i++) {
    const item = res[i];
    result.push({
      id: item.id,
      title: item.title,
      description: [item.categoryText, item.language],
      content: item.author,
      time: item.publisher,
      cover: item.cover,
      fileName: item.fileName,
    });
  }
  return result;
});

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '图书名',
    colProps: {
      span: 8,
    },
    componentProps: {
      // onChange: (e: any) => {
      //   console.log(e);
      // },
    },
  },
  {
    field: 'author',
    component: 'Input',
    label: '作者',
    colProps: {
      span: 8,
    },
    componentProps: {
      // onChange: (e: any) => {
      //   console.log(e);
      // },
    },
  },
];
