import { FormSchema } from '/@/components/Form/index';
import { getBookList } from '@/api/book/book';
export const searchList = async (params = {}) => {
  const result: any[] = [];
  const { title, author,page, pageSize}: any = params;
  const p: any = {
    page,
    pageSize,
  };
  if (title) p.title = title;
  if (author) p.author = author;
  console.log(p);

  let { data, count } = await getBookList(p);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
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
  return {data: result, count};
};

export const actions: any[] = [
  { icon: 'clarity:star-line', text: '156', color: '#018ffb' },
  { icon: 'bx:bxs-like', text: '156', color: '#459ae8' },
  { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d' },
];

export const schemas: FormSchema[] = [
  {
    field: 'title',
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
